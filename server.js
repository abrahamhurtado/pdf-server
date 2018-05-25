const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const send = require("koa-send");
const puppeteer = require("puppeteer");

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT;

app.use(bodyParser());

router.get("/", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = "Hello world";
});

router.post("/generate.pdf", async (ctx, next) => {
  const { name, url, html } = ctx.request.body;

  if (html || url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (html) {
      await page.setContent(html);
    } else {
      await page.goto(url);
    }

    await page.pdf({ path: `${name || "document"}.pdf`, format: "Letter" });

    await send(ctx, `${name || "document"}.pdf`);
    await browser.close();
  } else {
    ctx.status = 422;
    ctx.body = {
      message: "Missing html or url parameters"
    };
  }
});

app.use(router.routes());
app.listen(PORT || 3000);
console.log(`App listening on port ${PORT || 3000}`);

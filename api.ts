import express from "express";
import serverless from "serverless-http";
import indexRouter from "./routes/index";

const api = express();

api.use('/', indexRouter);

export const handler = serverless(api);
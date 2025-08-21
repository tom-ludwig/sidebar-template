import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("views/layouts/app.tsx", [
    index("views/home/index.tsx"),
    route("dashboard", "views/dashboard/index.tsx"),
    route("settings", "views/settings/index.tsx"),
    route("docs", "views/docs/index.tsx"),
  ]),
  route("*", "views/404.tsx"),
] satisfies RouteConfig;

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  get_water_usage_endpoint: "http://localhost:9092/water-monitor-service/water-usage/v1.0/",
  login_endpoint: "http://localhost:9092/user-service/login",
  get_logged_in_user_endpoint: "http://localhost:9092/user-service/user",
  get_random_tip_endpoint: "http://localhost:9092/water-monitor-service/tip/v1.0/",

  token: "TOKEN",
};

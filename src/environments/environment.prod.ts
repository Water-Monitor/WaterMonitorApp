export const environment = {
  production: true,
  get_graph_endpoint: "http://localhost:9092/water-monitor-service/graph/v1.0?fromDate=@fromDate&untilDate=@untilDate",
  get_prediction_endpoint: "http://localhost:9092/water-monitor-service/prediction/next-week/v1.0?fromDate=@fromDate&untilDate=@untilDate",
  login_endpoint: "http://localhost:9092/user-service/login",
  get_logged_in_user_endpoint: "http://localhost:9092/user-service/user",
  get_random_tip_endpoint: "http://localhost:9092/water-monitor-service/tip/v1.0",

  token: "TOKEN",
};

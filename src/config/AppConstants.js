//http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080 <- if not working run homereno-api and replace this with http://localhost:8080
export const AppConstants = {
  API_BASE_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/',
  OAUTH2_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/',
  API_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/api/',
  AUTH_API:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/api/auth/',
  GOOGLE_AUTH_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/google?redirect_uri=http://localhost:8081/login',
  FACEBOOK_AUTH_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/facebook?redirect_uri=http://localhost:8081/login',
  GITHUB_AUTH_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/github?redirect_uri=http://localhost:8081/login',
  LINKEDIN_AUTH_URL:
    'http://ec2-35-163-200-125.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/linkedin?redirect_uri=http://localhost:8081/login',
};

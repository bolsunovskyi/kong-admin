# Kong Admin

This is light administration tool for kong api gateway (getkong.org)
Tested with kong version `0.10.1`

To run in docker execute following commands:
- docker build -t kong-admin:latest .
- docker run -p 8080:8080 kong-admin:latest

Details of project build you can see in Dockerfile.

To test admin panel with local kong you may run docker-compose with provided docker-compose.yml file

TODO:
- Implement pagination
- Implement plugins with table types
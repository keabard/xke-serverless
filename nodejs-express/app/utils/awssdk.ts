import { APIVersions, ConfigurationOptions } from 'aws-sdk/lib/config';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as AWS from "aws-sdk";


const awsconf: ConfigurationOptions & APIVersions = {
  region: "eu-west-1",
  apiVersions: {
    apigateway: '2015-07-09',
    cloudwatch: '2010-08-01',
    dynamodb: '2012-08-10',
    lambda: '2015-03-31',
    s3: '2006-03-01'
  }
};
AWS.config.update(awsconf);


let DocumentClient, DynamoDB;
if (process.env.NODE_ENV === 'test') {
  const configDynamo = {
    region: "eu-west-1",
    endpoint: "http://localhost:8888",
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy'
  };

  DynamoDB = new AWS.DynamoDB(configDynamo);
  DocumentClient = new AWS.DynamoDB.DocumentClient(configDynamo);
}
else {
  DynamoDB = new AWS.DynamoDB();
  DocumentClient = new AWS.DynamoDB.DocumentClient();
}

export { DynamoDB };
export { DocumentClient };
export default AWS;

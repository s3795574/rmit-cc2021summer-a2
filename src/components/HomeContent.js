import React from 'react'
import Hero from './Hero';


export default function HomeContent() {
  return (
    <section className="container">
        <div className="rows features">
            <div className="row">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                            <h2>About</h2>
                            <p>The project is simulating a cloud storage solution for startup company. Tranditionally, cloud storage websites
                                need at least 3 servers, running frontend, backend API, in addition to managing and issuing user tokens. They require 
                                databases necessary to store user files. This would result in substantial costs for a startup. Thus, with AWS micro services
                                we have built a prototype that not only lowers costs, but would allow us to scale our resources in future
                                as the user base grows.</p>
                        </div>
                    </div>
                </div>
            </div>
           <Hero />
            <div className="column">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Serverless Architecture</h4>
                            <p>This assignment is focusing on using AWS micro service to build a serverless web application.
                                The micro services we used are below:
                            </p>
                            <ul>
                                <li><b>Cognito</b>: Manage user functions such as signing up and changing passwords.</li>
                                <li><b>API Gateway</b>: Triggers lambda functions, so that backend servers are no longer needed.</li>
                                <li><b>Lambda</b>: Traditional backend server functions hosted on the AWS lambda.</li>
                                <li><b>DynamoDB</b>: Stores the file information such as the upload's user, file name and download link</li>
                                <li><b>S3 bucket</b>: Stores the actual file inside S3 bucket.</li>
                                <li><b>Ec2</b>: The website is running on an Amazon Elastic Compute Cloud instance, set up with NodeJs to 
                                deploy the application</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Reference</h4>
                            <p>The GitHub repository <a href="https://github.com/jspruance/aws-cognito-tutorial-starter">Hexal Energy app </a> 
                            give us a good start on frontend framework. So that we could focus on integrating AWS services instead of spending a lot of
                            time on the frontend design such as CSS file and the page layout. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

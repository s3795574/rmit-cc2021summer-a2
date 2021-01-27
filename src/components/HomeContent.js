import React from 'react'

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Reference</h4>
                            <p>The GitHub repository <a href="https://github.com/jspruance/aws-cognito-tutorial-starter">Hexal Energy app </a> 
                            give us a good start on frontend framework. So that we could focus on integrating AWS services instead of spending a lot of
                            time on the frontend design such as CSS file and the page layout. </p>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Serverless Architecture</h4>
                            <p>This assignment is focusing on using AWS micro service to build a serverless web application.
                                The micro services we used are below:
                            </p>
                            <ul>
                                <li><b>Cognito</b>: Manage user functions such as sign up, changing password and forgot password.</li>
                                <li><b>API Gateway</b>: To trigger lambda functions, so that we do not need to run a backend server.</li>
                                <li><b>Lambda</b>: We implement traditional backend server functions on the AWS lambda.</li>
                                <li><b>DynamoDB</b>: Store the file information such as which user it belongs to, file name and download link</li>
                                <li><b>S3 bucket</b>: Store the actual file inside S3 bucket.</li>
                                <li><b>Elastic Beanstalk</b>: The website is running on Beanstalk instead of running on a VM or container that need to 
                                setup before deploy.</li>
                            </ul>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                            <h4>About</h4>
                            <p>The project is simulating a cloud storage solution for startup company. Tranditionally, a cloud storage website
                                need at least 3 servers, running frontend, backend API and managing and issuing user token. Also, it needs a 
                                database to store all the files and other information. Those hardwares cost a lot to a startup company. We are
                                using AWS micro services to build a prototype that not only lower the cost, but also be able to scale in the future
                                as the user increase during the time.</p>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

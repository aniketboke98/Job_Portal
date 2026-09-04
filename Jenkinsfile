pipeline {
    agent any

    environment {
        PROJECT_PATH = "/var/lib/jenkins/workspace/test-pinint"
        DEPLOY_PATH  = "/var/www/test.pinint.com"
        PORT         = "30000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code..."

                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${PROJECT_PATH}") {
                    sh '''
                        echo "Installing dependencies..."
                        npm ci
                    '''
                }
            }
        }

        stage('Build React') {
            steps {
                dir("${PROJECT_PATH}") {
                    sh '''
                        echo "Building React application..."
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying React application..."

                    sudo mkdir -p ${DEPLOY_PATH}

                    sudo rm -rf ${DEPLOY_PATH}/*

                    sudo cp -r ${PROJECT_PATH}/dist/* ${DEPLOY_PATH}/

                    sudo chown -R www-data:www-data ${DEPLOY_PATH}

                    sudo chmod -R 755 ${DEPLOY_PATH}

                    echo "Deployment completed."
                '''
            }
        }

        stage('Nginx Test') {
            steps {
                sh '''
                    sudo nginx -t
                '''
            }
        }

        stage('Reload Nginx') {
            steps {
                sh '''
                    sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            echo "======================================"
            echo "DEPLOYMENT SUCCESSFUL"
            echo "======================================"
            echo "Domain: https://test.pinint.com"
            echo "Path: ${DEPLOY_PATH}"
        }

        failure {
            echo "======================================"
            echo "DEPLOYMENT FAILED"
            echo "======================================"
        }
    }
}

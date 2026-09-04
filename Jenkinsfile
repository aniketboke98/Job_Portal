pipeline {
    agent any

    environment {
        SERVER_IP   = "204.12.199.185"
        SERVER_USER = "administrator"
        DEPLOY_PATH = "/var/www/test.pinint.com"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'

                checkout scm
            }
        }

        stage('Check Node & NPM') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version

                    echo "NPM version:"
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing React dependencies...'

                sh '''
                    npm ci
                '''
            }
        }

        stage('Build React Application') {
            steps {
                echo 'Building React application...'

                sh '''
                    npm run build
                '''
            }
        }

        stage('Verify Build') {
            steps {
                sh '''
                    if [ ! -d "dist" ]; then
                        echo "ERROR: dist folder was not created."
                        exit 1
                    fi

                    echo "Build successful."
                    echo "Build contents:"
                    ls -lah dist
                '''
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: ['test-pinint-server']) {

                    sh '''
                        set -e

                        echo "======================================"
                        echo "Deploying to server"
                        echo "Server: ${SERVER_IP}"
                        echo "User: ${SERVER_USER}"
                        echo "Path: ${DEPLOY_PATH}"
                        echo "======================================"

                        echo "Testing SSH connection..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "echo SSH connection successful"

                        echo "Creating deployment directory..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo mkdir -p ${DEPLOY_PATH}"

                        echo "Removing old application..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo rm -rf ${DEPLOY_PATH}/*"

                        echo "Uploading new React build..."

                        scp -o StrictHostKeyChecking=no -r \
                            dist/. \
                            ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/

                        echo "Setting permissions..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo chown -R www-data:www-data ${DEPLOY_PATH}"

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo chmod -R 755 ${DEPLOY_PATH}"

                        echo "Testing Nginx..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo nginx -t"

                        echo "Reloading Nginx..."

                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo systemctl reload nginx"

                        echo "======================================"
                        echo "DEPLOYMENT SUCCESSFUL"
                        echo "======================================"
                    '''
                }
            }
        }
    }

    post {

        success {
            echo '''
========================================
        DEPLOYMENT SUCCESSFUL
========================================

Website:
https://test.pinint.com
'''
        }

        failure {
            echo '''
========================================
          DEPLOYMENT FAILED
========================================

Check the Console Output above.
'''
        }
    }
}

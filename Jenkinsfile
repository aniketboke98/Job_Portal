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
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci --no-audit --no-fund'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['test-pinint-server']) {
                    sh '''
                        set -e

                        echo "Testing SSH..."
                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "echo SSH OK"

                        echo "Creating deployment directory..."
                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo mkdir -p ${DEPLOY_PATH}"

                        echo "Removing old files..."
                        ssh -o StrictHostKeyChecking=no \
                            ${SERVER_USER}@${SERVER_IP} \
                            "sudo rm -rf ${DEPLOY_PATH}/*"

                        echo "Uploading React build..."
                        scp -o StrictHostKeyChecking=no -r \
                            dist/. \
                            ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/

                        echo "Fixing permissions..."
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

                        echo "DEPLOYMENT SUCCESSFUL"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Successfully deployed to test.pinint.com'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}

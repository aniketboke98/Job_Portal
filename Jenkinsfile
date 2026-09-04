pipeline {
    agent any

    environment {
        SERVER_IP   = "204.12.199.185"
        SERVER_USER = "administrator"
        DEPLOY_PATH = "/var/www/test.pinint.com"
        TEMP_PATH   = "/tmp/job-portal-deploy"
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

                        SERVER="${SERVER_USER}@${SERVER_IP}"

                        echo "======================================"
                        echo "Testing SSH..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "echo SSH OK"

                        echo "======================================"
                        echo "Creating temporary deployment directory..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}"

                        echo "======================================"
                        echo "Uploading React build..."
                        echo "======================================"

                        scp -o StrictHostKeyChecking=no -r \
                            dist/. \
                            "$SERVER:${TEMP_PATH}/"

                        echo "======================================"
                        echo "Creating deployment directory..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo mkdir -p ${DEPLOY_PATH}"

                        echo "======================================"
                        echo "Removing old files..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo rm -rf ${DEPLOY_PATH}/*"

                        echo "======================================"
                        echo "Installing new build..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo cp -r ${TEMP_PATH}/. ${DEPLOY_PATH}/"

                        echo "======================================"
                        echo "Fixing permissions..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo chown -R www-data:www-data ${DEPLOY_PATH}"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo chmod -R 755 ${DEPLOY_PATH}"

                        echo "======================================"
                        echo "Cleaning temporary files..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "rm -rf ${TEMP_PATH}"

                        echo "======================================"
                        echo "Testing Nginx..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
                            "sudo nginx -t"

                        echo "======================================"
                        echo "Reloading Nginx..."
                        echo "======================================"

                        ssh -o StrictHostKeyChecking=no \
                            "$SERVER" \
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
            echo 'Successfully deployed to test.pinint.com'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}

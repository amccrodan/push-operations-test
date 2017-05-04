pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "cd /Users/Shared/Jenkins/code/push-operations-test && git reset --hard origin/${env.BRANCH_NAME}"
            }
        }
        stage('Test') {
            steps {
                echo 'new-branch2..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

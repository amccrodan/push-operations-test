pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'cd /Users/Shared/Jenkins/code/push-operations-test'
                sh "git reset --hard origin/${env.BRANCH_NAME}"
            }
        }
        stage('Test') {
            steps {
                echo 'new-branch..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

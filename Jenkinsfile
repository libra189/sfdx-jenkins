pipeline{
	agent any
	tools {nodejs "nodejsLTS"}

	stages{
	    stage("Environment"){
			steps{
				sh 'node --version'
				// sh 'npm list -g --depth=0'
			}
		}
		stage("Authentication SFDX"){
			steps{
				sh 'sfdx force:auth:jwt:grant -i ${CONSUMER_KEY} -u ${HUB_USERNAME} -f ${JWT_KEY_FILE} -a jwt'
			}
			post{
				success{
					sh 'sfdx force:org:list'
				}
			}
		}
	}
}
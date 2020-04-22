pipeline {
    agent any
    tools {nodejs "NodeJS_12.16.2"}

    environment {
        // テスト結果格納ディレクトリ
        RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    }

    stages {
        stage("Initialize") {
            parallel {
                stage("Git Checkout") {
                    steps {
                        git branch: '${GIT_BRANCH_PARAM}',
                            credentialsId: '9a5404ed-e31a-4b55-88e1-a61051e7bb7a',
                            url: 'https://github.com/libra189/salesforce_de.git'
                    }
                }
                stage("Authentication SFDX") {
                    steps {
                        rc = sh(
                            returnStatus: true,
                            script: 'sfdx force:auth:jwt:grant -i ${CONSUMER_KEY} -u ${HUB_USERNAME} -f ${JWT_KEY_FILE} -a jwt'
                        )
                        if (rc != 0) {
                            error message: '開発組織への認証失敗'
                        }

                    }
                    post {
                        success {
                            sh 'sfdx force:org:list'
                        }
                    }
                }
            }
        }
        stage("Run Test") {
            steps {
                timeout(time: 120, unit: 'SECONDS') {
                    rc = sh(
                        returnStatus: true,
                        script: '''
                        sfdx force:apex:test:run \
                        --codecoverage \
                        --resultformat json \
                        --outputdir ${RUN_ARTIFACT_DIR} \
                        --targetusername ${HUB_USERNAME} \
                        --classnames ${TEST_CLASSES}
                        '''
                    )
                    if (rc != 0) {
                        error message: 'Apexテスト実行失敗'
                    }
                }
            }
            post {
                success {
                    script {
                        // コードカバレッジを取得
                        def runId = sh(returnStdout: true, script: 'cat ${RUN_ARTIFACT_DIR}/test-run-id.txt')
                        def resultFile = "${RUN_ARTIFACT_DIR}/test-result-${runId}.json"

                        // 総コード数
                        def totalLines = sh(returnStdout: true, script: "cat ${resultFile} | /usr/bin/jq -c .coverage.summary.totalLines")

                        // カバーしたコード数
                        def coveredLines = sh(returnStdout: true, script: "cat ${resultFile} | /usr/bin/jq -c .coverage.summary.coveredLines")

                        // カバー率を計算
                        def testRunCoverage = Integer.parseInt(rstrip(coveredLines)) / Integer.parseInt(rstrip(totalLines))
                        println "カバー率: ${testRunCoverage}"

                        // テストのコードカバレッジが75%以下のときテスト失敗
                        if (testRunCoverage < 0.75) {
                            error message:"コードカバレッジが75%以下のため失敗"
                        }
                    }
                }
            }
        }
    }
}

/**
 * 空白、改行類を削除
 * @param str 整形する文字列
 * @return String
 */
def rstrip(str){
    str.replaceAll(/\s+\z/,"")
}
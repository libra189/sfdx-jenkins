pipeline {
    agent any
    tools {nodejs "NodeJS_12.16.2"}

    environment {
        // テスト結果格納ディレクトリ
        RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
        PROD_ROOT_URL="https://ap16.lightning.force.com"
    }

    stages {
        stage("Initialize") {
            parallel {
                stage("Git Checkout") {
                    steps {
                        git branch: "${GIT_BRANCH_PARAM}",
                            credentialsId: '9a5404ed-e31a-4b55-88e1-a61051e7bb7a',
                            url: 'https://github.com/libra189/salesforce_de.git'
                    }
                }
                stage("Authentication SFDX") {
                    steps {
                        sh"""
                        sfdx force:auth:jwt:grant \
                        --clientid ${CONSUMER_KEY} \
                        --username ${HUB_USERNAME} \
                        --jwtkeyfile ${JWT_KEY_FILE} \
                        --setalias dev
                        """
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
                script {
                    timeout(time: 120, unit: 'SECONDS') {
                        def status = sh(
                            returnStdout: true,
                            script:"""
                            sfdx force:apex:test:run \
                            --codecoverage \
                            --resultformat json \
                            --outputdir ${RUN_ARTIFACT_DIR} \
                            --targetusername ${HUB_USERNAME} \
                            --classnames ${TEST_CLASSES}
                            """
                        )

                        if (status != 0) {
                            error: 'テストに失敗しました'
                        }
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
                            error message: 'コードカバレッジが75%以下のため失敗'
                        }
                    }
                }
            }
        }
        stage("Deploy to Production") {
            steps {
                script {
                    sh(label: 'Authentication Production',
                    script: """
                    sfdx force:auth:jwt:grant \
                    --clientid ${PROD_CONSUMER_KEY} \
                    --username ${PROD_HUB_USERNAME} \
                    --jwtkeyfile ${PROD_JWT_KEY_FILE} \
                    --setalias prod
                    """
                    )

                    def result = sh(label: 'Test deploy source',
                        returnStdout: true,
                        script: """
                        sfdx force:source:deploy \
                        --checkonly \
                        --targetusername prod \
                        --manifest manifest/package.xml \
                        --testlevel RunSpecifiedTests \
                        --runtests AccountDetailTest \
                        --json
                        """
                    )
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
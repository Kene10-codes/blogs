const { debuggerIsAttached } = require('debugger-is-attached')
const path = require('path')

module.exports = async () => {
    const isDebuggerAttached = await debuggerIsAttached()

    // const unitTestFolder = './tests/unit'
    const integrationTestFolder = '/tests/integration'
    const getSetupFiles = (folder) =>
        isDebuggerAttached ? [] : [path.join(__dirname, folder, 'jestSetup.js')]

    const baseProjectConfig = {
        //Here put any properties that are the same for
        //all folders and can be specified at level
        //of the project object (all such properties
        //are declared in type ProjectConfig in
        //Config.ts in Jest repo)
    }

    let config = {
        //any config key/values in configuration (except those
        //that are to specified in ProjectConfig)
        //e.g.
        //collectCoverage: true,

        //project config
        projects: [
            // {
            //     ...baseProjectConfig,
            //     displayName: 'UnitTests',
            //     testMatch: [path.join(unitTestFolder, '**/*.test.js')],
            //     slowTestThreshold: 1000, //1 second
            //     setupFilesAfterEnv: getSetupFiles(unitTestFolder),
            // },
            {
                ...baseProjectConfig,
                displayName: 'IntegrationTests',
                testMatch: [
                    path.join(__dirname, integrationTestFolder, '**/*.test.js'),
                ],
                slowTestThreshold: 60000, //1 minute
                setupFilesAfterEnv: getSetupFiles(integrationTestFolder),
            },
        ],
        //any other Jest config goes here
        //(these are any properties declared in type
        //InitialConfig but not in type ProjectConfig
        //in Config.ts in Jest repo)
    }

    if (isDebuggerAttached) config['testTimeout'] = 600000 //ten minutes

    return config
}

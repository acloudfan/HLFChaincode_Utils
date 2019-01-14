/**
 * reads the nw-config yaml
 * Replaces the PK/Cert for the peers
 */
const fs = require('fs');
const yaml = require('node-yaml')

const CRYPTOGEN_PEER="../crypto/crypto-config/peerOrganizations"

var obj = yaml.readSync('./nw-config.template.yaml')
createYAMLCryptogen(obj)
console.log('done')

// console.log("obj=", obj)



// console.log(genCertPathCryptogen('budget'))
// console.log(genPkCryptogen("budget"))

// Generates the YAML based on the 
function createYAMLCryptogen(obj){
    let acmeCert = genCertPathCryptogen('acme')
    let acmePk = genPkCryptogen("acme")
    obj.organizations.Acme.signedCert.path=acmeCert
    obj.organizations.Acme.adminPrivateKey.path=acmePk
    let budgetCert = genCertPathCryptogen('budget')
    let budgetPk = genPkCryptogen("budget")
    obj.organizations.Budget.signedCert.path=budgetCert
    obj.organizations.Budget.adminPrivateKey.path=budgetPk

    console.log(acmeCert)
    yaml.writeSync("nw-config.yaml", obj)
}

function genCertPathCryptogen(org){ 
    //budget.com/users/Admin@budget.com/msp/signcerts/Admin@budget.com-cert.pem"
    var certPath=CRYPTOGEN_PEER+"/"+org+".com/users/Admin@"+org+".com/msp/signcerts/Admin@"+org+".com-cert.pem"
    return certPath
}

// looks for the PK files in the org folder
function    genPkCryptogen(org){
    // ../crypto/crypto-config/peerOrganizations/budget.com/users/Admin@budget.com/msp/keystore/05beac9849f610ad5cc8997e5f45343ca918de78398988def3f288b60d8ee27c_sk
    var pkFolder=CRYPTOGEN_PEER+"/"+org+".com/users/Admin@"+org+".com/msp/keystore"
    fs.readdirSync(pkFolder).forEach(file => {
        // console.log(file);
        // return the first file
        pkfile = file
        return
    })

    return pkFolder+"/"+pkfile
}
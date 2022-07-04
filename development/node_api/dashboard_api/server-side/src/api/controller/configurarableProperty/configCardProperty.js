const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
const s3File = require('../../lib/reads3File');

router.post('/configCardProperties', auth.authController, async (req, res) => {
    try {
        logger.info('--- Configurable card properties ---');

        let filename = `ui_configurable_property/ui_configurable_property.json`
         let data = await s3File.readFileConfig(filename);
       
        data.forEach(data => {
            data.routerLink = `/${data.reportName.replace(/\s+/g, '-').toLowerCase()}/${data.reportType}`;
        });

        logger.info('--- Configurable card properties  api response sent ---');
        res.status(200).send({ data: data });
    } catch (e) {
        logger.error(e);
        res.status(500).json({ errMessage: "Internal error. Please try again!!" });
    }
})

module.exports = router;
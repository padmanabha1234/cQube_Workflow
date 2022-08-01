const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
const s3File = require('../../lib/reads3File');

router.post('/distWise', auth.authController, async (req, res) => {
    try {
        logger.info('---common table distWise api ---');

        let { year, grade, dataSource, month, week, subject_name, exam_date, period, management, category, reportType } = req.body

        let fileName
        if (reportType == "lotable") {
            if (category == 'overall') {
                if (period == "overall") {
                    fileName = `${dataSource}/overall/district_subject_footer.json`;
                } else if (period == "last 30 days") {

                    fileName = `${dataSource}/last_30_day/district_subject_footer.json`;
                } else if (period == "last 7 days") {

                    fileName = `${dataSource}/last_7_day/district_subject_footer.json`;
                } else if (period == "last 7 days") {

                    fileName = `${dataSource}/last_7_day/district_subject_footer.json`;
                } else if (period == "last day") {

                    fileName = `${dataSource}/last_day/district_subject_footer.json`;
                } else if (period == "year and month") {

                    if (month && !week && !exam_date && !grade && !subject_name) {
                        fileName = `${dataSource}/${year}/${month}/district_subject_footer.json`
                    } if (month && !week && !exam_date && grade && !subject_name) {
                        fileName = `${dataSource}/${year}/${month}/district_subject_footer.json`
                    } else if ((month && week && !exam_date && !grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if ((month && week && exam_date && !grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    } else if ((month && week && !exam_date && grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if ((month && week && !exam_date && grade && subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if ((month && week && exam_date && grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    } else if ((month && week && exam_date && grade && subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    }
                }
            } else {
                if (management == "govt" && period == "overall") {

                    fileName = `${dataSource}/school_management_category/overall/${management}/district_subject_footer.json`;
                } else if (period == "last 30 days") {

                    fileName = `${dataSource}/last_30_day/district_subject_footer.json`;
                } else if (period == "last 7 days") {

                    fileName = `${dataSource}/last_7_day/district_subject_footer.json`;
                } else if (period == "last 7 days") {

                    fileName = `${dataSource}/last_7_day/district_subject_footer.json`;
                } else if (period == "last day") {

                    fileName = `${dataSource}/last_day/district_subject_footer.json`;
                } else if (period == "year and month") {

                    if (month && !week && !exam_date && !grade && !subject_name) {
                        fileName = `${dataSource}/${year}/${month}/district_subject_footer.json`
                    } if (month && !week && !exam_date && grade && !subject_name) {
                        fileName = `${dataSource}/${year}/${month}/district_subject_footer.json`
                    } else if ((month && week && !exam_date && !grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if ((month && week && exam_date && !grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    } else if ((month && week && exam_date && grade && !subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district/${grade}.json`
                    } else if ((month && week && exam_date && grade && subject_name)) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    }
                }
            }
        } else {

            if (category == 'overall') {
                if (period === "overall") {
                    if (grade && !subject_name) {
                        fileName = `${dataSource}/overall/district/${grade}.json`;
                    } else if (grade && subject_name) {

                        fileName = `${dataSource}/overall/district_subject_footer.json`;
                    } else if (!grade && !subject_name) {
                        fileName = `${dataSource}/overall/district.json`;
                    }
                } else if (period === "last 30 days") {
                    if (grade && !subject_name) {
                        fileName = `${dataSource}/last_30_day/district/${grade}.json`;
                    } else if (grade && subject_name) {

                        fileName = `${dataSource}/last_30_day/district_subject_footer.json`;
                    } else if (!grade && !subject_name) {
                        fileName = `${dataSource}/last_30_day/district.json`;
                    }
                } else if (period === "last 7 days") {
                    if (grade && !subject_name) {
                        fileName = `${dataSource}/last_7_day/district/${grade}.json`;
                    } else if (grade && subject_name) {

                        fileName = `${dataSource}/last_7_day/district_subject_footer.json`;
                    } else if (!grade && !subject_name) {
                        fileName = `${dataSource}/last_7_day/district.json`;
                    }
                } else if (period === "last day") {
                    if (grade && !subject_name) {
                        fileName = `${dataSource}/last_day/district/${grade}.json`;
                    } else if (grade && subject_name) {

                        fileName = `${dataSource}/last_day/district_subject_footer.json`;
                    } else if (!grade && !subject_name) {
                        fileName = `${dataSource}/last_day/district.json`;
                    }
                } else if (period === "year and month") {

                    if (month && !week && !exam_date && !grade && !subject_name) {

                        fileName = `${dataSource}/${year}/${month}/district.json`
                    } else if (month && !week && !exam_date && grade && !subject_name) {

                        fileName = `${dataSource}/${year}/${month}/district/${grade}.json`
                    } else if (month && !week && !exam_date && grade && subject_name) {

                        fileName = `${dataSource}/${year}/${month}/district_subject_footer.json`
                    } else if (month && week && !exam_date && !grade && !subject_name) {

                        fileName = `${dataSource}/${year}/${month}/week_${week}/district.json`
                    } else if (month && week && exam_date && !grade && !subject_name) {
         
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district.json`
                    } else if (month && week && !exam_date && grade && !subject_name) {

                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if (month && week && !exam_date && grade && subject_name) {

                        fileName = `${dataSource}/${year}/${month}/week_${week}/district_subject_footer.json`
                    } else if (month && week && exam_date && grade && !subject_name) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district/${grade}.json`
                    } else if (month && week && exam_date && grade && subject_name) {
                        fileName = `${dataSource}/${year}/${month}/week_${week}/${exam_date}/district_subject_footer.json`
                    } else if (!month && !week && !exam_date && !grade && !subject_name) {
                        fileName = `${dataSource}/overall/district.json`;
                    }
                }


            } else {

            }
        }
      
        let sourceName = ""
        let filename1 = `${dataSource}/meta_tooltip.json`
        let metricValue = await s3File.readFileConfig(filename1);
        metricValue.forEach(metric => sourceName = metric.result_column)
        let data = await s3File.readFileConfig(fileName);


        let footer = data['allDistrictsFooter']

        data = data['data']


        let districtDetails = data.map(e => {
            return {
                district_id: e.district_id,
                district_name: e.district_name
            }
        })

        districtDetails = districtDetails.reduce((unique, o) => {
            if (!unique.some(obj => obj.district_id === o.district_id)) {
                unique.push(o);
            }
            return unique;
        }, []);

        let arr = {}

        if (month) {
            data = data.filter(val => {
                return val.month == month
            })
        }

        if (week) {
            data = data.filter(val => {
                return val.week == `week_${week}`
            })
        }

        if (exam_date) {
            data = data.filter(val => {
                return val.distribution_date == exam_date
            })
        }

        if (grade) {
            data = data.filter(val => {
                return val.grade == grade
            })
        }

        if (subject_name) {
            data = data.filter(val => {
                return val.subject == subject_name
            })
        }

        if (reportType === "lotable") {
            Promise.all(data.map(item => {

                let label
                if (week && !exam_date) {

                    label =
                        item.grade + "/" +
                        item.subject + "/" + item.week.split("_")[1]
                    arr[label] = arr.hasOwnProperty(label) ? [...arr[label], ...[item]] : [item];
                } else if (week && exam_date) {
                    label = item.distribution_date + "/" + item.grade + "/" + item.subject + "/" + item.week.split("_")[1]
                    arr[label] = arr.hasOwnProperty(label) ? [...arr[label], ...[item]] : [item];
                } else {
                    label =
                        item.grade + "/" +
                        item.subject + "/" + item.week
                    arr[label] = arr.hasOwnProperty(label) ? [...arr[label], ...[item]] : [item];
                }
            })).then(() => {
                let keys = Object.keys(arr)
                let sourceName1 = sourceName
                let val = []
                for (let i = 0; i < keys.length; i++) {
                    let z = arr[keys[i]].sort((a, b) => (a.district_name) > (b.district_name) ? 1 : -1)
                    let splitVal = keys[i].split('/')
                    if (week && !exam_date) {
                        var x = {
                            grade: splitVal[0],
                            subject: splitVal[1],
                            week: splitVal[3],

                        }
                    } else if (week && exam_date) {
                        var x = {
                            grade: splitVal[1],
                            subject: splitVal[2],
                            week: splitVal[3],
                            date: splitVal[0]

                        }
                    } else {
                        var x = {
                            grade: splitVal[0],
                            subject: splitVal[1],
                        }
                    }

                    z.map((val1) => {
                      
                        let y = {
                            [`${val1.district_name} `]: { percentage: val1[`${sourceName.trim()}`] },
                        }
                        x = { ...x, ...y }
                    })
                    val.push(x);
                }

                var tableData = [];
                // filling the missing key - value to make the object contains same data set
                if (val.length > 0) {
                    let obj = val.reduce((res1, item) => ({ ...res1, ...item }));
                    let keys1 = Object.keys(obj);
                    let def = keys1.reduce((result1, key) => {
                        result1[key] = ''
                        return result1;
                    }, {});
                    tableData = val.map((item) => ({ ...def, ...item }));
                    logger.info('--- PAT LO table distWise response sent ---');
                    res.status(200).send({ districtDetails, tableData });
                } else {
                    logger.info('--- PAT LO table schoolWise response sent ---');
                    res.status(500).send({ errMsg: "No record found" });
                }
            })
        } else if (reportType === "Map") {
            logger.info('--- common map distWise response sent ---');
            data = data.map(({
                district_latitude: lat,
                district_longitude: long,

                ...rest
            }) => ({
                lat, long,
                ...rest
            }));
            res.status(200).send({ data, districtDetails, footer });
        }
    } catch (e) {
        logger.error(`Error:: ${e} `)
        res.status(500).json({ errMessage: "Internal error. Please try again!!" });
    }
});



module.exports = router;
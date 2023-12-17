const yup = require("yup");
const { sendError } = require(".");

exports.validateCreateUser = async (req, res, next) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        profilePic: yup.string(),
    })
    await validate(schema, req.body, res, next);
}

exports.validateCreateChannel = async (req, res, next) => {
    const schema = yup.object().shape({
        channelUsers: yup.array().of(yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            profilePic: yup.string(),
        })).length(2).required()
    })
    await validate(schema, req.body, res, next);
}

exports.validateGetChannelList = async (req, res, next) => {
    const schema = yup.object().shape({
        email: yup.string().required(),
    })
    await validate(schema, req.query, res, next);
}

exports.validateSearchUser = async (req, res, next) => {
    const schema = yup.object().shape({
        email: yup.string().required(),
    })
    await validate(schema, req.query, res, next);
}

exports.validateAddMessage = async (req, res, next) => {
    const schema = yup.object().shape({
        channelId: yup.string().required(),
        message: yup.object().shape({
            sendEmail: yup.string().required(),
            text: yup.string().required()
        })
    })
    await validate(schema, req.body, res, next);
}

const validate = async (schema, reqData, res, next) => {
    try {
        await schema.validate(reqData, { abortEarly: false });
        next();
    } catch (e) {
        const error = e.inner.map(({ path, message, value }) => ({
            path, message, value
        }));
        sendError(res, error, "Invalid Request")
    }
}
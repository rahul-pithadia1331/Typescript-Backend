import { Request, Response } from 'express';
import { IController } from './interfaces';
import { User } from '../../../model';
import validators from './validators';
import _ from './../../../helper/helper';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { IModel } from '../../../model/lib/interface';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

dotenv.config();

class Controllers implements IController {
    async registration(req: Request, res: Response): Promise<Response> {
        try {
            const aMissing: string[] = [];
            const aTypeValidation: string[] = [];
            if (validators.checkMissingValue(req.body, aMissing)) {
                return res.status(400).json({
                    message:
                        aMissing.length > 1
                            ? `${aMissing.join(', ')} are required fields`
                            : `${aMissing.join('')} is required field`,
                });
            }

            if (validators.checkMissingValue(req.body, aTypeValidation)) {
                return res.status(200).json({
                    message:
                        aTypeValidation.length > 1
                            ? `${aTypeValidation.join(
                                  ', '
                              )} is are invalid fields`
                            : `${aTypeValidation.join('')} is invalid field`,
                });
            }

            if (_.isValidEmail(req.body.sEmail)) {
                return res
                    .status(400)
                    .json({ message: 'Given email is invalid' });
            }

            let oUser = await User.findOne({
                sEmail: req.body.sEmail,
            });

            if (oUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            if (req.body.sPassword !== req.body.sConfirmPassword) {
                return res.status(400).json({
                    message: 'Confirm password and Password do not match',
                });
            }

            console.log('password', req.body);

            const sEncryptedPassword: string = await bcrypt.hash(
                req.body.sPassword,
                10
            );

            oUser = new User({
                ...req.body,
                'oName.sFirstName': req.body.sFirstName,
                'oName.sLastName': req.body.sLastName,
                sPassword: sEncryptedPassword,
            });

            let oMongodbValidationError = oUser.validateSync();

            if (oMongodbValidationError) {
                return res
                    .status(400)
                    .json({ message: _.errorMessage(oMongodbValidationError) });
            }

            await oUser.save();

            return res
                .status(200)
                .json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async signIn(req: Request, res: Response): Promise<Response> {
        try {
            let aMissing: string[] = [];

            if (validators.signInMissingValue(req.body, aMissing)) {
                return res.status(400).json({
                    message:
                        aMissing.length > 1
                            ? `${aMissing.join(', ')} are required fields`
                            : `${aMissing.join('')} is required field`,
                });
            }

            const oUser = await User.findOne({
                sEmail: req.body.sEmail,
            });

            if (!oUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const sPassword: boolean = await bcrypt.compare(
                req.body.sPassword,
                oUser.sPassword
            );

            if (sPassword != true) {
                return res.status(200).json({ messages: 'Invalid password' });
            }

            const sToken = jwt.sign(
                { user_id: oUser._id },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '2h',
                }
            );

            oUser.sToken = sToken;

            await oUser.save();

            return res
                .status(200)
                .json({ message: 'Sign in Successfully', data: { sToken } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editProfile(req: Request, res: Response): Promise<Response> {
        try {
            const aMissing: string[] = [];
            if (validators.editProfileMissingValue(req.body, aMissing)) {
                return res.status(400).json({
                    message:
                        aMissing.length > 1
                            ? `${aMissing.join(', ')} are required fields`
                            : `${aMissing.join('')} is required field`,
                });
            }

            if (_.isValidEmail(req.body.sEmail)) {
                return res
                    .status(400)
                    .json({ message: 'Given email is invalid' });
            }

            let oUser = await User.findOne({
                sEmail: req.body.sEmail,
            });

            if (!oUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            oUser.oName = {
                sFirstName: req.body.sFirstName,
                sLastName: req.body.sLastName,
            };

            oUser.save();

            return res
                .status(200)
                .json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async changePassword(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.body.sEmail) {
                return res
                    .status(400)
                    .json({ message: 'Email is required field' });
            }

            if (_.isValidEmail(req.body.sEmail)) {
                return res
                    .status(400)
                    .json({ message: 'Given email id is valid' });
            }

            const oUser = await User.findOne({
                sEmail: req.body.sEmail,
            });

            if(!oUser){
                return res.status(404).json({message: 'User not found'})
            }

            let oOTPDetails = await _.sendAccessCode(req.body.sEmail);

            return res
                .status(200)
                .json({
                    message: 'Password updated Successfully',
                    data: { oOTPDetails },
                });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const controllers = new Controllers();

export default controllers;

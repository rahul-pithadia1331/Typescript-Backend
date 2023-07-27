import { Request, Response } from 'express';
import { IController } from './interfaces';
import Model from '../model/index';

const controllers: IController = {
    addData: async (req: Request, res: Response): Promise<Response> => {
        try {
            const aMissing: string[] = [];
            const aTypeValidation: string[] = [];

            if (!req.body.sName as boolean) {
                aMissing.push('Name');
            }

            if (!req.body.sEmail as boolean) {
                aMissing.push('Email');
            }

            if (aMissing.length > 0) {
                return res.status(400).json({
                    message:
                        aMissing.length > 1
                            ? `${aMissing.join(', ')} are required fields`
                            : `${aMissing.join('')} is required field`,
                });
            }

            if ((typeof req.body.sName !== 'string') as boolean) {
                aTypeValidation.push('Name');
            }

            if ((typeof req.body.sEmail !== 'string') as boolean) {
                aTypeValidation.push('Email');
            }

            if (req.body.sWalletAddress) {
                if ((typeof req.body?.sWalletAddress !== 'string') as boolean) {
                    aTypeValidation.push('Wallet-Address');
                }
            }

            if (req.body.nAge) {
                if ((typeof req.body?.nAge !== 'number') as boolean) {
                    aTypeValidation.push('Age');
                }
            }

            if (aTypeValidation.length > 0) {
                return res.status(403).json({
                    message:
                        aTypeValidation.length > 1
                            ? `${aTypeValidation.join(', ')} field are invalid`
                            : `${aTypeValidation.join('')} field is invalid`,
                });
            }

            let oData = await Model.findOne({
                sName: req.body.sName as string,
            });

            if (oData) {
                return res.status(409).json({ message: 'Data already exists' });
            }

            oData = new Model({
                sName: req.body.sName as string,
                sEmail: req.body.sEmail as string,
                sWalletAddress: req.body?.sWalletAddress as string,
                nAge: req.body?.nAge as number,
            });

            await oData.save();

            return res.status(200).json({ message: 'Data added successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getData: async (req: Request, res: Response): Promise<Response> => {
        try {
            let oData = await Model.find({});
            return res
                .status(200)
                .json({ message: 'User data fetch successfully', data: oData });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateData: async (req: Request, res: Response): Promise<Response> => {
        try {
            const aMissing: string[] = [];
            const aTypeValidation: string[] = [];

            if (!req.body.sName as boolean) {
                aMissing.push('Name');
            }

            if (!req.body.sEmail as boolean) {
                aMissing.push('Email');
            }

            if (aMissing.length > 0) {
                return res.status(400).json({
                    message:
                        aMissing.length > 1
                            ? `${aMissing.join(', ')} are required fields`
                            : `${aMissing.join('')} is required field`,
                });
            }

            if ((typeof req.body.sName !== 'string') as boolean) {
                aTypeValidation.push('Name');
            }

            if ((typeof req.body.sEmail !== 'string') as boolean) {
                aTypeValidation.push('Email');
            }

            if (req.body.sWalletAddress) {
                if ((typeof req.body?.sWalletAddress !== 'string') as boolean) {
                    aTypeValidation.push('Wallet-Address');
                }
            }

            if (req.body.nAge) {
                if ((typeof req.body?.nAge !== 'number') as boolean) {
                    aTypeValidation.push('Age');
                }
            }

            if (aTypeValidation.length > 0) {
                return res.status(403).json({
                    message:
                        aTypeValidation.length > 1
                            ? `${aTypeValidation.join(', ')} field are invalid`
                            : `${aTypeValidation.join('')} field is invalid`,
                });
            }

            let oData = await Model.findOne({
                sName: req.body.sName as string,
            });

            if (!oData as boolean) {
                return res.status(404).json({ message: 'Data not found' });
            }

            await oData?.updateOne({
                ...req.body,
            });

            return res
                .status(200)
                .json({ message: 'Data updated successfully'});
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteData: async (req: Request, res: Response): Promise<Response> => {
        try{
            const oData = await Model.findOne({
                sName: req.body.sName as string,
            })

            if(!oData as boolean){
                return res.status(404).json({message: 'Data not found'});
            }

            oData?.deleteOne();

            return res.status(200).json({message: 'Data deleted successfully'})
        }catch(error){
            return res.status(500).json({messages: 'Internal server error'})
        }
    }
};

export default controllers;

import { useState } from 'react';
import { TOperation } from './Type';
export const Signin = (): any => {
    const [oOperations, oSetOperations] = useState<TOperation>({
        nSum: 0,
        nNumber1: 0,
        nNumber2: 0,
    });

    const values = (event: any) => {
        // console.log(event.target.);
        const {id, value} = event.target;
        
        oSetOperations({
            ...oOperations,
            [id]: value,
        });
    };

    const addnumber = () => {
        // console.log(typeof number1, typeof number2);
        oSetOperations({
            ...oOperations,
            nSum: Number(oOperations.nNumber1) + Number(oOperations.nNumber2),
        });
    };

    return (
        <div>
            <h1> hello world</h1>
            NUMBER 1{' '}
            <input
                id="nNumber1"
                className="form-control mt-2"
                type="number"
                onChange={values}
            />
            <br></br>
            NUMBER 2
            <input
                id="nNumber2"
                className="form-control mt-2"
                type="number"
                onChange={values}
            />
            <br></br>
            <button
                className="btn btn-primary mx-auto"
                type="button"
                onClick={addnumber}
            >
                Add 2 Numbers
            </button>
            <h1 className="mt-4">Answer : {String(oOperations.nSum)}</h1>
        </div>
    );
};

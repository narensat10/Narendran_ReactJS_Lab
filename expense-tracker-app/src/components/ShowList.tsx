import { useEffect, useState } from 'react';
import IDataList from '../model/IDataList';
import { getDataFromServer } from '../services/menu';
import ExpenseTracker from './ExpenseTracker';

function ShowList() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>();
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);

    var rahulSpent1: number = 0;
    var rameshSpent1: number = 0;

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => (result = result + v.price), 0));
                Shares(data);
            } catch (error: any) {
                setError(error);
            }
        };
        fetchMenu();
    }, [showForm]);

    const Shares = (data: IDataList[]) => {
        data.map((sams) =>
            sams.payeeName === "Rahul"
                ? (rahulSpent1 = rahulSpent1 + sams.price)
                : (rameshSpent1 = rameshSpent1 + sams.price)
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    };


    const success = () => {
        setShowForm(false);

    }

    const cancel = () => {
        setShowForm(false);
    }


    return (
        <>
            <header id='page-Header'>Expense Tracker</header>
            <button id='Add-Button' onClick={() => setShowForm(true)}>Add</button>
            {showForm && (
                <div className='form'>
                    <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
                </div>
            )
            }
            <>

                <div className='use-inline date header-color'>Date</div>
                <div className='use-inline  header-color'>Product Purchased</div>
                <div className='use-inline price header-color'>Price</div>
                <div className='use-inline header-color'>Payee</div>
            </>
            {
                items &&
                items.map((user, ind) => (
                    <div key={ind}>
                        <div className='use-inline date'>{user.setDate}</div>
                        <div className='use-inline'>{user.product}</div>
                        <div className='use-inline price'>{user.price}</div>
                        <div className='use-inline'>{user.payeeName}</div>
                    </div>
                )
                )
            }
            <hr />
            <div className='use-inline'>Total </div>
            <span className='use-inline total'>{sum}</span><br />
            <div className='use-inline'>Rahul Paid </div>
            <span className='use-inline total Rahul'>{rahulSpent}</span><br />
            <div className='use-inline'>Ramesh Paid </div>
            <span className='use-inline total Ramesh'>{rameshSpent}</span><br />
            <span className='use-inline payable'>{rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}</span>
            <span className='use-inline payable price'>
                {" "}
                {Math.abs((rahulSpent - rameshSpent) / 2)}
            </span>
            {
                error &&
                <>
                    {error?.message}
                </>
            }
        </>

    );
}

export default ShowList;
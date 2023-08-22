import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

export default function CaclculatorPage() {
    const {setPageDescrip} = useOutletContext();
    const [purchasePrice, setPurchasePrice] = useState(null);
    const [financing, setFinancing] = useState(true);
    const [interestRate, setInterestRate] = useState("");
    const [interestRateReturn, setInterestRateReturn] = useState(null);
    const [purchaseCost, setPurchaseCost] = useState("");
    const [grossRent, setGrossRent] = useState(null);
    const [downPayment, setDownPayment] = useState(null);
    const [downPaymentReturn, setDownPaymentReturn] = useState(null)
    const [loanTerm, setLoanTerm] = useState(null);
    const [rehabCost, setRehabCost] = useState(null);
    const [vacancyRate, setVacancyRate] = useState(null);
    const [vacancyRateReturn, setVacancyRateReturn] = useState(null);
    const [operatingExpenses, setOperatingExpenses] = useState(null);
    const [cashNeeded, setCashNeeded] = useState(null);
    const [cashFlow, setCashflow] = useState(null);
    const [capRate, setCapRate] = useState(null);
    const [coc, setCoc] = useState(null);
    const [ltv, setLtv] = useState(null);
    const [amountFinanced, setAmountFinanced] = useState(null);
    const [noi, setNoi] = useState(null);
    const [loanPayment, setLoanPayment] = useState(null);
    const [purchaseCostCash, setPurchaseCostCash] = useState(null);
    const [purchaseCostReturn, setPurchaseCostReturn] = useState(null);
    const [downPaymentCash, setDownPaymentCash] = useState(null);
    const [operatingIncome, setOperatingIncome] = useState(null);

    useEffect(() => {
        setPageDescrip('Calculator')
    }, []);

    const calculateLoanPayment = (amountFinanced, interestRateReturn, loanTerm) => {
        let monthly_interest_rate = interestRateReturn / 12 / 100;
        let total_months = loanTerm * 12;
        let numerator = amountFinanced * monthly_interest_rate * (1 + monthly_interest_rate) ** total_months
        let denominator = (1 + monthly_interest_rate) ** total_months - 1;
        let monthly_payment = numerator / denominator;
        
        return monthly_payment;
    }

    const calculateAnalysis = () => {
        const calculatedLtv = downPaymentReturn !== 0 ? 1 - downPaymentReturn : 1 - 1;
        const calculatedAmountFinanced = calculatedLtv * purchasePrice;
        const calculatedDownPaymentCash = purchasePrice * downPaymentReturn;
        const calculatedPurchaseCostCash = purchasePrice * purchaseCostReturn;
        const calculatedCashNeeded = financing ? +calculatedDownPaymentCash + +calculatedPurchaseCostCash + +rehabCost : +purchasePrice + +calculatedPurchaseCostCash + +rehabCost;
        const calculatedOperatingIncome = grossRent * (1 - vacancyRateReturn);
        const calculatedNoi = calculatedOperatingIncome - operatingExpenses;
        const calculatedLoanPayment = calculateLoanPayment(calculatedAmountFinanced, interestRateReturn, loanTerm);
        const calculatedCashflow = calculatedNoi - calculatedLoanPayment;
        const calculatedCapRate = (calculatedNoi * 12) / purchasePrice;
        const calculatedCoc = (calculatedNoi * 12) / calculatedCashNeeded;
    
        return {
            calculatedLtv,
            calculatedAmountFinanced,
            calculatedDownPaymentCash,
            calculatedPurchaseCostCash,
            calculatedCashNeeded,
            calculatedOperatingIncome,
            calculatedNoi,
            calculatedLoanPayment,
            calculatedCashflow,
            calculatedCapRate,
            calculatedCoc,
          };
        };

    const handlePurchasePriceChange = (value) => {
        setPurchasePrice(value);
    };


    const handleFinancingChange = (value) => {
        console.log("Selected value:", value);
        setFinancing(value === "true"); 
    };
    
    useEffect(() => {
        if (!financing) {
            setDownPaymentReturn(0)
        }
    }, [financing]);

    const handleInterestRateChange = (value) => {
        setInterestRate(value);
        setInterestRateReturn(value / 100);
    };

    const handlePurchaseCostChange = (value) => {
        setPurchaseCost(value);
        setPurchaseCostReturn(value/100)
    };

    const handleDownPaymentChange = (value) => {
        setDownPayment(value);
        setDownPaymentReturn(value / 100);
    };

    const handleLoanTermChange = (value) => {
        setLoanTerm(value);
    };

    const handleRehabCostChange = (value) => {
        setRehabCost(parseFloat(value));
    };

    const handleGrossRentChange = (value) => {
        setGrossRent(value);
    };

    const handleVacancyRateChange = (value) => {
        setVacancyRate(value);
        setVacancyRateReturn(value/100)
    };

    const handleOperatingExpensesChange = (value) => {
        setOperatingExpenses(value);
    };


    return (
        <>
        <div className=" w-full mt-8 mb-8 flex flex-no-wrap flex-row h-3/4 items-center justify-evenly ">
            <div className="h-full p-5 bg-white relative rounded">
                <form
                    className="h-full"
                    onSubmit={(e) => {
                    e.preventDefault();
                    const analysisResults = calculateAnalysis();
                    // Update the state with the calculated values
                    setLtv(analysisResults.calculatedLtv);
                    setAmountFinanced(analysisResults.calculatedAmountFinanced.toFixed(2));
                    setDownPaymentCash(analysisResults.calculatedDownPaymentCash.toFixed(2));
                    setPurchaseCostCash(analysisResults.calculatedPurchaseCostCash.toFixed(2));
                    setCashNeeded(analysisResults.calculatedCashNeeded.toFixed(2));
                    setOperatingIncome(analysisResults.calculatedOperatingIncome.toFixed(2));
                    setNoi(analysisResults.calculatedNoi.toFixed(2));
                    setLoanPayment(analysisResults.calculatedLoanPayment.toFixed(2));
                    setCashflow(analysisResults.calculatedCashflow.toFixed(2));
                    setCapRate(analysisResults.calculatedCapRate);
                    setCoc(analysisResults.calculatedCoc);
                }}>
                   <div className="flex flex-col h-full justify-evenly">
                    <div className="text-lg font-bold">Purchase Expenses</div>
                    <div>
                        <label htmlFor="purchase_price">Purchase Price: $</label>
                        <input
                            className="border border-black rounded w-1/3"
                            type="text"
                            value={purchasePrice || ""}
                            onChange={(e) => handlePurchasePriceChange(e.target.value)}
                        />
                    </div>
                    <div>
                    <label htmlFor="financing">Financing:</label>
                    <select
                        className="border border-black rounded"
                        value={financing ? "true" : "false"}
                        onChange={(e) => handleFinancingChange(e.target.value)}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                {financing && ( 
                    <>
                    <div>
                        <label htmlFor="interestRate">Interest Rate: </label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="number"
                            value={interestRate || ""}
                            onChange={(e) => handleInterestRateChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="downPayment">Down Payment: </label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="number"
                            value={downPayment || ""}
                            onChange={(e) => handleDownPaymentChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="loanTerm">Loan Term: </label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="text"
                            value={loanTerm || ""}
                            onChange={(e) => handleLoanTermChange(e.target.value)}
                        /> <span>Years</span>
                    </div>
                    </>
            )}
                    <div>
                        <label htmlFor="purchaseCost">Purchase Cost: </label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="number"
                            value={purchaseCost || ""}
                            onChange={(e) => handlePurchaseCostChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="rehabCost">Rehab Cost: $</label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="number"
                            value={rehabCost || ""}
                            onChange={(e) => handleRehabCostChange(e.target.value)}
                        />
                    </div>
                    <div className="font-bold">Income and Vacancy:</div>
                    <div>
                        <label htmlFor="grossRent">Gross Rent: $</label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="text"
                            value={grossRent || ""}
                            onChange={(e) => handleGrossRentChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="vacancyRate">Vacancy Rate: </label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="number"
                            value={vacancyRate || ""}
                            onChange={(e) => handleVacancyRateChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="operatingExpenses">Operating Expenses: $</label>
                        <input
                        className="border border-black rounded w-1/3"
                            type="text"
                            value={operatingExpenses || ""}
                            onChange={(e) => handleOperatingExpensesChange(e.target.value)}
                        />
                    </div>   
                    <div className="text-center mt-2">
                    <button className="border border-black rounded bg-sky-700 hover:bg-sky-900 text-white pl-3 pr-3" type="submit">Save</button>
                    </div>
                    </div>
                </form>
                </div>
                <div className="h-full p-5 bg-white relative rounded w-1/3 flex flex-col justify-between">
                    <div className="text-lg font-bold">Analysis</div>
                    <div>Cash Needed: ${cashNeeded}</div>
                    <div>Down Payment: ${downPaymentCash}</div>
                    <div>Purchase Cost: ${purchaseCostCash}</div>
                    <div>LTV: {ltv}%</div>
                    <div>Amount Financed: ${amountFinanced}</div>
                    <div>Loan Payment P&I: ${loanPayment}</div>
                    <div>Cash Flow ${cashFlow}</div>
                    <div>Cap Rate: {capRate ? capRate.toFixed(2) : ""}%</div>
                    <div>COC: {coc ? coc.toFixed(2) : ""}%</div>
                    <div>Operating Income: ${operatingIncome}</div>
                    <div>NOI: ${noi}</div>
                </div>
            </div>
        </>
    )
}
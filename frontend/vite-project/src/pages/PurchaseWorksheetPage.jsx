import { useParams, useOutletContext, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { api } from "./utilities.jsx";


export default function PurchaseWorksheetPage() {

    const {setPageDescrip, userId} = useOutletContext();
    const { propertyId } = useParams();
    const [purchaseWorksheetData, setPurchaseWorksheetData] = useState(null);
    const [operatingExpenseData, setOperatingExpensesData] = useState(null);
    const [purchasePrice, setPurchasePrice] = useState(null);
    const [financing, setFinancing] = useState(true);
    const [interestRate, setInterestRate] = useState("");
    const [interestRateReturn, setInterestRateReturn] = useState("");
    const [purchaseCost, setPurchaseCost] = useState("");
    const [purchaseCostReturn, setPurchaseCostReturn] = useState(null);
    const [grossRent, setGrossRent] = useState(null);
    const [arv, setArv] = useState(null);
    const [downPayment, setDownPayment] = useState(null);
    const [downPaymentReturn, setDownPaymentReturn] = useState(null);
    const [loanTerm, setLoanTerm] = useState(null);
    const [rehabCost, setRehabCost] = useState(null);
    const [vacancyRate, setVacancyRate] = useState(null);
    const [vacancyRateReturn, setVacancyRateReturn] = useState(null);
    const [propertyTaxes, setPropertyTaxes] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [propertyManagement, setPropertyManagement] = useState(null);
    const [propertyManagementReturn, setPropertyManagementReturn] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [maintenanceReturn, setMaintenanceReturn] = useState("");
    const [capex, setCapex] = useState("");
    const [capexReturn, setCapexReturn] = useState(null);
    const [utilities, setUtilities] = useState(null);
    const [hoaFees, setHoaFees] = useState(null);
    const [landscaping, setLandscaping] = useState(null);
    const [otherexp, setOtherexp] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [propertyAnalysis, setPropertyAnalysis] = useState(null);
    const [cashNeeded, setCashNeeded] = useState(null);
    const [cashFlow, setCashflow] = useState(null);
    const [capRate, setCapRate] = useState(null);
    const [coc, setCoc] = useState(null);
    const [ltv, setLtv] = useState(null);
    const [amountFinanced, setAmountFinanced] = useState(null);
    const [ppsqft, setPpsqft] = useState(null);
    const [apsqft, setApsqft] = useState(null);
    const [noi, setNoi] = useState(null);
    const [loanPayment, setLoanPayment] = useState(null);
    const [purchaseCostCash, setPurchaseCostCash] = useState(null);
    const [downPaymentCash, setDownPaymentCash] = useState(null);
    const [operatingIncome, setOperatingIncome] = useState(null);


    const fetchExistingPurchaseWorksheet = async () => {
        try {
            const response = await api.get(`properties/property/${propertyId}/purchaseworksheet/`);
            console.log(response.data);
            setPurchaseWorksheetData(response.data);
            setOperatingExpensesData(response.data.operating_expenses);

        } catch (error) {
            console.error("Error fetching purchase worksheet:", error);
        }
    };

    useEffect(() => {
        setPageDescrip('Purchase Worksheet');
    }, []);

    useEffect(() => {
        fetchExistingPurchaseWorksheet();
    }, [propertyId]);

    

    // ... (other code remains the same)

useEffect(() => {
    if (purchaseWorksheetData) {
        setPurchasePrice(purchaseWorksheetData.purchase_price);
        setFinancing(purchaseWorksheetData.financing);
        setInterestRate(purchaseWorksheetData.interest_rate * 100);
        setPurchaseCost(purchaseWorksheetData.purchase_cost * 100);
        setGrossRent(purchaseWorksheetData.gross_rent);
        setArv(purchaseWorksheetData.arv);
        setDownPayment(purchaseWorksheetData.down_payment * 100);
        setLoanTerm(purchaseWorksheetData.loan_term);
        setRehabCost(purchaseWorksheetData.rehab_cost);
        setVacancyRate(purchaseWorksheetData.vacancy_rate * 100);
        setPropertyTaxes(operatingExpenseData.property_taxes);
        setInsurance(operatingExpenseData.insurance)
        setPropertyManagement(operatingExpenseData.property_management * 100);
        setMaintenance(operatingExpenseData.maintenance * 100);
        setCapex(operatingExpenseData.cap_ex * 100);
        setHoaFees(operatingExpenseData.hoa_fees);
        setUtilities(operatingExpenseData.utilities);
        setLandscaping(operatingExpenseData.landscaping);
        setOtherexp(operatingExpenseData.other_exp)
        setTotalExpenses(operatingExpenseData.total_expenses)
        setPropertyAnalysis(purchaseWorksheetData.property_analysis)
        console.log(propertyAnalysis)

    }
}, [purchaseWorksheetData]);

    useEffect(() => {
        if (propertyAnalysis) {
            setCashNeeded(propertyAnalysis.cash_needed);
            setCashflow(propertyAnalysis.cash_flow);
            setCapRate(propertyAnalysis.cap_rate);
            setCoc(propertyAnalysis.coc);
            setLtv(propertyAnalysis.ltv);
            setAmountFinanced(propertyAnalysis.amount_financed);
            setPpsqft(propertyAnalysis.pricepersqft);
            setApsqft(propertyAnalysis.arvpersqft);
            setNoi(propertyAnalysis.noi);
            setLoanPayment(propertyAnalysis.loan_payment);
            setPurchaseCostCash(propertyAnalysis.purchase_cost_cash);
            setDownPaymentCash(propertyAnalysis.down_payment_cash);
            setOperatingIncome(propertyAnalysis.operating_income);
        }
    }, [propertyAnalysis]);



    const handlePurchasePriceChange = (value) => {
        setPurchasePrice(value);
    };

    const handleArvChange = (value) => {
        setArv(value);
    };

    const handleFinancingChange = (value) => {
        console.log("Selected value:", value);
        setFinancing(value === "true"); 
    };
    
    useEffect(() => {
        if (!financing) {
            setDownPaymentReturn(1.00);
        }
    }, [financing]);

    const handleInterestRateChange = (value) => {
        setInterestRate(value);
        setInterestRateReturn(value / 100);
    };

    const handlePurchaseCostChange = (value) => {
        setPurchaseCost(value);
        setPurchaseCostReturn(value / 100);
    };

    const handleDownPaymentChange = (value) => {
        setDownPayment(value);
        setDownPaymentReturn(value / 100);
    };

    const handleLoanTermChange = (value) => {
        setLoanTerm(value);
    };

    const handleRehabCostChange = (value) => {
        setRehabCost(value);
    };

    const handleGrossRentChange = (value) => {
        setGrossRent(value);
    };

    const handleVacancyRateChange = (value) => {
        setVacancyRate(value);
        setVacancyRateReturn(value / 100);
    };

    // Operating Expenses
    const handlePropertyTaxesChange = (value) => {
        setPropertyTaxes(value);
    };

    const handleInsuranceChange = (value) => {
        setInsurance(value);
    };

    const handlePropertyManagementChange = (value) => {
        setPropertyManagement(value);
        setPropertyManagementReturn(value / 100);
    };

    const handleMaintenanceChange = (value) => {
        setMaintenance(value);
        setMaintenanceReturn(value / 100);
    };

    const handleCapexChange = (value) => {
        setCapex(value);
        setCapexReturn(value / 100);
    };

    const handleHoaFeesChange = (value) => {
        setHoaFees(value);
    };

    const handleUtilitiesChange = (value) => {
        setUtilities(value);
    };

    const handleLanscapingChange = (value) => {
        setLandscaping(value);
    };

    const handleOtherExpensesChange = (value) => {
        setOtherexp(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const required = [purchasePrice, arv, purchaseCost, rehabCost, grossRent, vacancyRate];

        if (financing) {
            required.push(interestRate, downPayment, loanTerm)
        };

        const incomplete = [];

        for (let field of required) {
            if (!field) {
                incomplete.push(field);
            };
        }

        if (incomplete.length > 0) {
            window.alert('Please enter a value for required fields.')
            console.log(incomplete)
            return
        }

        if (financing && interestRate <= 0) {
            window.alert('Intererst rate must be greater than zero.')
        }


        try {
            // Update the purchase worksheet data
            const response = await api.put(`properties/property/${propertyId}/purchaseworksheet/`, {
                purchase_price: purchasePrice,
                arv: arv,
                financing: financing,
                interest_rate: interestRateReturn ? interestRateReturn : purchaseWorksheetData.interest_rate ? purchaseWorksheetData.interest_rate : 1.00,
                purchase_cost: purchaseCostReturn ? purchaseCostReturn : purchaseWorksheetData.purchase_cost,
                down_payment: downPaymentReturn ? downPaymentReturn : purchaseWorksheetData.down_payment,
                loan_term: loanTerm ? loanTerm : 1,
                rehab_cost: rehabCost,
                gross_rent: grossRent,
                vacancy_rate: vacancyRateReturn ? vacancyRateReturn : purchaseWorksheetData.vacancy_rate,
                operating_expenses: {
                    property_taxes: propertyTaxes,
                    insurance: insurance,
                    property_management: propertyManagementReturn ? propertyManagementReturn : operatingExpenseData.property_management,
                    maintenance: maintenanceReturn ? maintenanceReturn: operatingExpenseData.maintenance,
                    cap_ex: capexReturn ? capexReturn : operatingExpenseData.cap_ex,
                    hoa_fees: hoaFees,
                    utilities: utilities,
                    landscaping: landscaping,
                    other_exp: otherexp
                }
            });
            console.log("Purchase worksheet data updated successfully.");
            console.log(response)

            await fetchExistingPurchaseWorksheet();

        } catch (error) {
            console.error("Error updating purchase worksheet data:", error);
        }
    };

    return (
        <>
        {purchaseWorksheetData !== null ? (
        <div>
            <div></div>
            <div className="mt-2 border border-white text-white rounded w-1/4 text-center bg-sky-700 hover:bg-sky-900"><Link to={`/property/${propertyId}`}>Back to Property</Link></div>
            <div  className=" w-full mt-5 mb-8 flex flex-no-wrap flex-row lg:h-3/4 md:h-full sm:h-full items-center justify-evenly "> 
                <div className="h-full p-5 mr-5 bg-white relative rounded overflow-scroll">     
                    <form className="h-full" onSubmit={handleSubmit}>
                        <div className="flex h-full flex-col lg:mt-12 md:mr-3 sm:mr-2 justify-around">
                            <div className="text-lg font-bold mb-1">
                                <h2>Purchase Expenses</h2>
                            </div>
                            <div className=" mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="purchase_price">Purchase Price:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={purchasePrice || ""}
                                        onChange={(e) => handlePurchasePriceChange(e.target.value)}
                                    /> <span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className=" mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="arv">After Repair Value:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={arv || ""}
                                        onChange={(e) => handleArvChange(e.target.value)}
                                    /><span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className=" mb-1 flex justify-between w-3/4 ">
                                <div>
                                    <label htmlFor="financing">Financing:</label>
                                </div>
                                <div>
                                    <select
                                        className="border border-black rounded"
                                        value={financing ? "true" : "false"}
                                        onChange={(e) => handleFinancingChange(e.target.value)}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            {financing && ( 
                                <div>
                                    <div className=" mb-1 flex justify-between">
                                        <div>
                                            <label htmlFor="interestRate">Interest Rate: </label>
                                        </div>
                                        <div >
                                            <span>% </span>
                                            <input
                                            className="border border-black rounded text-center w-3/4"
                                                type="number"
                                                value={interestRate || ""}
                                                onChange={(e) => handleInterestRateChange(e.target.value)}
                                            /> <span className="text-lg"> *</span>
                                        </div>
                                    </div>
                                    <div className=" mb-1 flex justify-between">
                                        <div >
                                            <label htmlFor="downPayment">Down Payment: </label>
                                        </div>
                                        <div>
                                            <span>% </span>
                                            <input
                                            className="border border-black rounded text-center w-3/4"
                                                type="number"
                                                value={downPayment || ""}
                                                onChange={(e) => handleDownPaymentChange(e.target.value)}
                                            /> <span className="text-lg"> *</span>
                                        </div>
                                    </div>
                                    <div className=" mb-1 flex justify-between">
                                        <div>
                                            <label htmlFor="loanTerm">Loan Term: <span>(years) </span> </label>
                                        </div>
                                        <div>
                                            <span className="text-white">yy</span>
                                            <input
                                            className="border border-black rounded text-center w-3/4"
                                                type="text"
                                                value={loanTerm || ""}
                                                onChange={(e) => handleLoanTermChange(e.target.value)}
                                            /> <span className="text-lg"> *</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className=" mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="purchaseCost">Purchase Cost:</label>
                                </div>
                                <div>
                                    <span>% </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center "
                                        type="number"
                                        value={purchaseCost || ""}
                                        onChange={(e) => handlePurchaseCostChange(e.target.value)}
                                    /> <span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className=" mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="rehabCost">Rehab Cost:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center "
                                        type="number"
                                        value={rehabCost || ""}
                                        onChange={(e) => handleRehabCostChange(e.target.value)}
                                    /><span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className="font-bold mb-1">Income and Vacancy:</div>
                        
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="grossRent">Gross Rent: (monthly)</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={grossRent || ""}
                                        onChange={(e) => handleGrossRentChange(e.target.value)}
                                    /><span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="vacancyRate">Vacancy Rate:</label>
                                </div>
                                <div>
                                    <span>% </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center "
                                        type="number"
                                        value={vacancyRate || ""}
                                        onChange={(e) => handleVacancyRateChange(e.target.value)}
                                    /> <span className="text-lg"> *</span>
                                </div>
                            </div>
                            <div className="font-bold mb-1">Operating Expenses <span className="font-normal">(monthly)</span></div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="propertyTaxes">Property Taxes:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={propertyTaxes || ""}
                                        onChange={(e) => handlePropertyTaxesChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="insurance">Insurance:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={insurance || ""}
                                        onChange={(e) => handleInsuranceChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="propertyManagement">Property Management:</label>
                                </div>
                                <div>
                                    <span>% </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={propertyManagement || ""}
                                        onChange={(e) => handlePropertyManagementChange(e.target.value)}
                                    /> 
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="maintenance">Maintenance:</label>
                                </div>
                                <div>
                                    <span>% </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={maintenance || ""}
                                        onChange={(e) => handleMaintenanceChange(e.target.value)}
                                    /> 
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="capex">Cap Ex:</label>
                                </div>
                                <div>
                                    <span>% </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center "
                                        type="number"
                                        value={capex || ""}
                                        onChange={(e) => handleCapexChange(e.target.value)}
                                    /> 
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="hoaFees">HOA Fees:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center"
                                        type="number"
                                        value={hoaFees || ""}
                                        onChange={(e) => handleHoaFeesChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="utilities">Utilities:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4  text-center"
                                        type="number"
                                        value={utilities || ""}
                                        onChange={(e) => handleUtilitiesChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="landscaping">Landscaping:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4 text-center "
                                        type="number"
                                        value={landscaping || ""}
                                        onChange={(e) => handleLanscapingChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <div>
                                    <label htmlFor="otherexp">Other Expenses:</label>
                                </div>
                                <div>
                                    <span>$ </span>
                                    <input
                                        className="border border-black rounded w-3/4  text-center"
                                        type="number"
                                        value={otherexp || ""}
                                        onChange={(e) => handleOtherExpensesChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="border rounded border-black bg-sky-700 hover:bg-sky-900 pl-1 pr-1 text-white" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            
                <div className="h-full p-5 bg-white relative rounded">
                    <div className="flex h-3/4 flex-col justify-between ">
                        <div className="font-bold text-lg">Property Analysis:</div>
                        <div>Cash Needed: ${cashNeeded}</div>
                        <div>Cash Flow ${cashFlow}</div>
                        <div>Cap Rate: {capRate}</div>
                        <div>COC: {coc}</div>
                        <div>LTV: {ltv}</div>
                        <div>Amount Financed: {amountFinanced}</div>
                        <div>Price/Sqft: {ppsqft}</div>
                        <div>ARV/Sqft: {apsqft}</div>
                        <div>NOI: {noi}</div>
                        <div>Loan Payment P&I: {loanPayment}</div>
                        <div>Purchase Cost: {purchaseCostCash}</div>
                        <div>Down Payment: {downPaymentCash}</div>
                        <div>Operating Income: {operatingIncome}</div>
                    </div>
                
                </div>               
            </div>
        </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </>
    );
}

import { useParams, useOutletContext } from "react-router-dom";
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
        try {
            // Update the purchase worksheet data
            await api.put(`properties/property/${propertyId}/purchaseworksheet/`, {
                purchase_price: purchasePrice,
                arv: arv,
                financing: financing,
                interest_rate: interestRateReturn ? interestRateReturn : purchaseWorksheetData.interest_rate,
                purchase_cost: purchaseCostReturn ? purchaseCostReturn : purchaseWorksheetData.purchase_cost,
                down_payment: downPaymentReturn ? downPaymentReturn : purchaseWorksheetData.down_payment,
                loan_term: loanTerm,
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

            await fetchExistingPurchaseWorksheet();

        } catch (error) {
            console.error("Error updating purchase worksheet data:", error);
        }
    };


    return (
        <div className='aProperty'>
            {purchaseWorksheetData !== null ? (
                <div>
                <form onSubmit={handleSubmit}>
                    <h2>Purchase Expenses</h2>
                    <div>
                        <label htmlFor="purchase_price">Purchase Price:</label>
                        <input
                            type="text"
                            value={purchasePrice || ""}
                            onChange={(e) => handlePurchasePriceChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="arv">After Repair Value:</label>
                        <input
                            type="text"
                            value={arv || ""}
                            onChange={(e) => handleArvChange(e.target.value)}
                        />
                    </div>
                    <div>
                    <label htmlFor="financing">Financing:</label>
                    <select
                        value={financing ? "true" : "false"}
                        onChange={(e) => handleFinancingChange(e.target.value)}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>


                </div>
                {financing && ( 
                <div>
                    <div>
                        <label htmlFor="interestRate">Interest Rate:</label>
                        <input
                            type="number"
                            value={interestRate || ""}
                            onChange={(e) => handleInterestRateChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="downPayment">Down Payment:</label>
                        <input
                            type="number"
                            value={downPayment || ""}
                            onChange={(e) => handleDownPaymentChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="loanTerm">Loan Term:</label>
                        <input
                            type="text"
                            value={loanTerm || ""}
                            onChange={(e) => handleLoanTermChange(e.target.value)}
                        /> <span>Years</span>
                    </div>
                </div>
            )}


                    <div>
                        <label htmlFor="purchaseCost">Purchase Cost:</label>
                        <input
                            type="number"
                            value={purchaseCost || ""}
                            onChange={(e) => handlePurchaseCostChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="rehabCost">Rehab Cost:</label>
                        <input
                            type="number"
                            value={rehabCost || ""}
                            onChange={(e) => handleRehabCostChange(e.target.value)}
                        />
                    </div>
                    <h3>Income and Vacancy:</h3>
                    <div>
                        <label htmlFor="grossRent">Gross Rent:</label>
                        <input
                            type="text"
                            value={grossRent || ""}
                            onChange={(e) => handleGrossRentChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="vacancyRate">Vacancy Rate:</label>
                        <input
                            type="number"
                            value={vacancyRate || ""}
                            onChange={(e) => handleVacancyRateChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <h4>Operating Expenses:</h4>
                    <div>
                        <label htmlFor="propertyTaxes">Property Taxes:</label>
                        <input
                            type="text"
                            value={propertyTaxes || ""}
                            onChange={(e) => handlePropertyTaxesChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="insurance">Insurance:</label>
                        <input
                            type="text"
                            value={insurance || ""}
                            onChange={(e) => handleInsuranceChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="propertyManagement">Property Management:</label>
                        <input
                            type="number"
                            value={propertyManagement || ""}
                            onChange={(e) => handlePropertyManagementChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="maintenance">Maintenance:</label>
                        <input
                            type="number"
                            value={maintenance || ""}
                            onChange={(e) => handleMaintenanceChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="capex">Cap Ex:</label>
                        <input
                            type="number"
                            value={capex || ""}
                            onChange={(e) => handleCapexChange(e.target.value)}
                        /> <span>%</span>
                    </div>
                    <div>
                        <label htmlFor="hoaFees">HOA Fees:</label>
                        <input
                            type="text"
                            value={hoaFees || ""}
                            onChange={(e) => handleHoaFeesChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="utilities">Utilities:</label>
                        <input
                            type="text"
                            value={utilities || ""}
                            onChange={(e) => handleUtilitiesChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="landscaping">Landscaping:</label>
                        <input
                            type="text"
                            value={landscaping || ""}
                            onChange={(e) => handleLanscapingChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="otherexp">Other Expenses:</label>
                        <input
                            type="text"
                            value={otherexp || ""}
                            onChange={(e) => handleOtherExpensesChange(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit">Save</button>
                </form>
                {purchaseWorksheetData.completed && (
                    <div>
                        <h2>Property Analysis</h2>
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
                )}
                </div>
                
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

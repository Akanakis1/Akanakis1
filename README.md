# Alexandros Kanakis

**Junior Data Analyst | Finance, pricing and forecasting**

Rotterdam, Netherlands. EU citizen, no visa sponsorship needed.

I turn finance and ERP data into numbers teams can act on. MSc in Applied Economics (University of Macedonia), BSc in Economics (Aristotle University of Thessaloniki). I am looking for a junior Data Analyst, Financial Analyst or BI role in the Netherlands, ideally in banking, fintech or a data-driven finance team.

[LinkedIn](https://www.linkedin.com/in/alexandros-kanakis/) · [Kaggle](https://www.kaggle.com/alexandroskanakis) · [Tableau Public](https://public.tableau.com/app/profile/alexandros.kanakis/vizzes)

---

## What I have done

- **Reconciliation.** Built an Excel till-close tool checked against the Capital ERP. A daily 15-minute close now takes under 5.
- **Pricing.** Spread a year of warehouse rent and pallet costs across 30+ product codes, weighted by purchase volume.
- **Research.** MSc thesis on 152 years of S&P 500 data (VAR, unit-root tests, predictive regressions, frequency-domain Granger causality): significant return predictability at the 1% level beyond 4 years. [Thesis](https://dspace.lib.uom.gr/handle/2159/30074)

The first two come from my work in Thessaloniki, so the code is not public.

---

## Public projects

### London House Price Prediction
Regression | Python, pandas, scikit-learn, XGBoost
- Predicts London sale prices with location clustering and engineered features.
- On a holdout set never used for fitting or selection: R² ≈ 0.65 and MAE ≈ £129K, against £394K for a mean baseline and £227K for a linear (Ridge) model on the same features.
- Cluster-level price statistics are computed from the training split only, to avoid target leakage.

[Repository](https://github.com/Akanakis1/London_House_Price_Prediction)

### Swiss Tourism Forecasting
Time series | Python, statsmodels
- Compares nine model families (seasonal naive, moving averages, ETS, ARMA, ARIMA, SARIMA, SARIMAX) on monthly Swiss hotel arrivals, with rolling-origin evaluation at 1 to 12 months ahead and a final test year that was never used for any choice.
- With the pandemic months replaced by expected values, ETS and SARIMA beat the seasonal naive baseline at every horizon (Diebold-Mariano, p < 0.05). On the final test year no model beat the baseline, and the README reports that.

[Repository](https://github.com/Akanakis1/Swiss_Tourism_Forecasting)

### Titanic: Machine Learning from Disaster
Classification | Python, scikit-learn, XGBoost
- Compares six classifiers with stratified 5-fold cross-validation. Imputation and scaling are learned inside each fold.
- Best model, XGBoost: 0.841 ± 0.017 CV accuracy. The top two models are within one standard deviation of each other.

[Repository](https://github.com/Akanakis1/Titanic_Machine_Learning_from_Disaster)

### Digit Recognizer (MNIST)
Classification | Python, scikit-learn, XGBoost
- Compares Logistic Regression, Decision Tree and XGBoost with a stratified train, validation and holdout split.
- Best model, XGBoost: 0.9755 accuracy on a holdout set that was never used for fitting, early stopping or selection.

[Repository](https://github.com/Akanakis1/Digit-Recognizer)

### Data visualization
Tableau Public: published dashboards on public datasets.
[Tableau Public profile](https://public.tableau.com/app/profile/alexandros.kanakis/vizzes)

---

## Tools

- **Programming:** Python (pandas, NumPy, scikit-learn, XGBoost), SQL, R (basic)
- **BI and spreadsheets:** Power BI, Tableau, Excel (pivot tables, macros, Solver)
- **Econometrics:** EViews, time series (VAR, ARIMA, unit-root tests)
- **Other:** Git, Jupyter, Capital ERP, Cactus ERP

## Next up

A SQL project (window functions and CTEs), a Power BI dashboard on public data, and Python rebuilds of more MSc projects (purchasing power parity, stock return predictability, portfolio optimisation).

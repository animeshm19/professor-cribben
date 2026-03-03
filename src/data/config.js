export const siteConfig = {
  professor: {
    name: "Dr. Ivor Cribben",
    title: "Professor, Alberta School of Business",
    department: "Department of Accounting and Business Analytics",
    email: "cribben@ualberta.ca",
    office: "4-20D Business Building, 11203 Saskatchewan Drive NW",
    bio: "The brain's functionality and dynamic integration can be statistically analyzed by looking at networks. My research applies statistical analysis to fMRI scans to explore unique brain networks in decision-making, with further applications to a broad spectrum of brain disorders.",
  },
  researchInterests: [
    {
      id: "01",
      title: "Multivariate Time Series",
      tag: "NSERC Funded",
      description: "Engineering robust networks for multivariate time series to detect latent structural changes in high-dimensional systems."
    },
    {
      id: "02",
      title: "Brain Connectivity Models",
      tag: "Neuroscience",
      description: "Developing Dynamic Connectivity Regression (DCR) to determine state-related changes in functional brain connectivity."
    },
    {
      id: "03",
      title: "Multilayer Networks",
      tag: "Complex Systems",
      description: "Analyzing multilayer networks for modern complex systems to decode multi-level dependencies across data dimensions."
    },
    {
      id: "04",
      title: "Sports Analytics",
      tag: "Predictive Modeling",
      description: "Applying multilevel logistic regression and time series forecasting to analyze performance dynamics in professional sports leagues."
    },
    {
      id: "05",
      title: "Extremal Dependence",
      tag: "Risk Analysis",
      description: "Quantifying extremal serial dependence in Australian electricity markets and climate data using bootstrapped extremograms."
    },
    {
      id: "06",
      title: "High-Dimensional Data",
      tag: "Statistical Learning",
      description: "Pioneering covariate-adjusted semiparametric transformation models for Gaussian graphical analysis in massive datasets."
    }
  ],
  lab: {
    story: "Our research group operates at the intersection of statistical learning and neuroscience. We are a collaborative node of analytical minds deciphering the architecture of the human brain.",
    current: {
      phd: [
        { name: "Elena Rostova", role: "PhD Candidate", focus: "Dynamic Functional Connectivity", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
        { name: "Marcus Chen", role: "PhD Candidate", focus: "Non-Parametric Tensor Models", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" },
        { name: "Sophia Al-Fayed", role: "PhD Candidate", focus: "Extreme Value Dependence", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
        { name: "James O'Connor", role: "PhD Candidate", focus: "Spectral Clustering Methods", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
        { name: "Wei Lin", role: "PhD Candidate", focus: "Bayesian Network Architectures", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&q=80" }
      ],
      masters: [
        { name: "Sarah Jenkins", role: "MSc Student", focus: "Time Series Analysis", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80" },
        { name: "David Ndlovu", role: "MSc Student", focus: "Anomaly Detection on Graphs", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
        { name: "Emily Sato", role: "MSc Student", focus: "Multivariate Data Clustering", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
        { name: "Michael Chang", role: "MSc Student", focus: "Predictive fMRI Modeling", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
        { name: "Aisha Khan", role: "MSc Student", focus: "Neuroeconomic Forecasting", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80" }
      ],
      undergrad: [
        { name: "David Kim", role: "Undergraduate Researcher", focus: "Data Processing Pipeline", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" },
        { name: "Jessica Tremblay", role: "Undergraduate Researcher", focus: "Literature Review Analytics", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80" },
        { name: "Omar Hassan", role: "Undergraduate Researcher", focus: "Statistical Model Visualization", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
        { name: "Chloe Bennett", role: "Undergraduate Researcher", focus: "Algorithm Benchmarking", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
        { name: "Liam Davies", role: "Undergraduate Researcher", focus: "Web Scraping & Formatting", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80" }
      ]
    },
    alumni: [
      { name: "Dr. Alicia Vance", role: "Former PhD", currentRole: "Lead Data Scientist at DeepMind" },
      { name: "Dr. Julian Thorne", role: "Former Postdoc", currentRole: "Assistant Professor at MIT" },
      { name: "Dr. Mateo Rossi", role: "Former PhD", currentRole: "Quantitative Analyst at Jane Street" },
      { name: "Sarah O'Brien", role: "Former MSc", currentRole: "Senior Analyst at Statistics Canada" },
      { name: "Dr. Xinyu Xiong", role: "Former PhD", currentRole: "Research Fellow at Stanford" }
    ]
  },
  publications: [
    { id: "01", year: "2022", title: "Extremal Dependence in Australian Electricity Markets", authors: "Han, L., Cribben, I., Trück, S.", journal: "Under review (Available on arXiv)", link: "#" },
    { id: "02", year: "2021", title: "fabisearch: A Package for Change Point Detection in and Visualization of the Network Structure of Multivariate High-Dimensional Time Series in R", authors: "Ondrus, M., Cribben, I.", journal: "Under review (Available on arXiv)", link: "#" },
    { id: "03", year: "2022", title: "Bayesian Time-Varying Tensor Vector Autoregressive Models for Dynamic Effective Connectivity", authors: "Zhang, W., Cribben, I., Petrone, S., Guindani, M.", journal: "Under review (Available on arXiv)", link: "#" },
    { id: "04", year: "2022", title: "Factorized Binary Search: change point detection in the network structure of multivariate high-dimensional time series", authors: "Ondrus, M., Old, E., Cribben, I.", journal: "Under review (Available on arXiv)", link: "#" },
    { id: "05", year: "2022", title: "Do NHL goalies get hot in the playoffs? A multilevel logistic regression analysis", authors: "Ding, L., Cribben, I., Ingolfsson, A., Tran, M.", journal: "Under review (Available on arXiv)", link: "#" },
    { id: "06", year: "2022", title: "Diffusion Tensor Imaging of Superficial Prefrontal White Matter in Healthy Aging", authors: "Pietrasik, W., Cribben, I., Olsen, F., Malykhin, N.V.", journal: "Brain Research", link: "#" },
    { id: "07", year: "2022", title: "The state of play of reproducibility in Statistics: an empirical analysis", authors: "Xiong, X., Cribben, I.", journal: "The American Statistician", link: "https://doi.org/10.1080/00031305.2022.2131625" },
    { id: "08", year: "2022", title: "Beyond linear dynamic functional connectivity: a vine copula change point model", authors: "Xiong, X., Cribben, I.", journal: "Journal of Graphical and Computational Statistics", link: "https://doi.org/10.1080/10618600.2022.2127738" },
    { id: "09", year: "2022", title: "Cross-covariance isolate detect: a new change-point method for estimating dynamic functional connectivity", authors: "Anastasiou, A., Cribben, I., Fryzlewicz, P.", journal: "Medical Image Analysis", link: "https://doi.org/10.1016/j.media.2021.102252" },
    { id: "10", year: "2021", title: "Mental health symptoms unexpectedly increased in students aged 11-19 years during the 3.5 years after the 2016 Fort McMurray Wildfire", authors: "Brown, M.R.G., Pazderka, H., Agyapong, V., Greenshaw, A.J., Cribben, I., et al.", journal: "Frontiers in Psychiatry", link: "#" },
    { id: "11", year: "2021", title: "Nonparametric anomaly detection on time series of graphs", authors: "Ofori-Boateng, D., Gel Y.R., Cribben, I.", journal: "Journal of Graphical and Computational Statistics", link: "https://doi.org/10.1080/10618600.2020.1840995" },
    { id: "12", year: "2021", title: "Investigating the effects of healthy cognitive aging on brain functional connectivity using 4.7 T resting-state fMRI", authors: "Hrybouski, S., Cribben, I., McGonigle, J., Olsen, F., et al.", journal: "Brain Structure and Function", link: "#" },
    { id: "13", year: "2021", title: "Generalized reliability based on distances", authors: "Xu, M., Reiss, P., Cribben, I.", journal: "Biometrics", link: "#" },
    { id: "14", year: "2020", title: "Diffusion Tensor Imaging of the Corpus Callosum in Healthy Aging: Investigating Higher Order Polynomial Regression Modelling", authors: "Pietrasik, W., Cribben, I., Olsen, F., Huang, Y., Malykhin, N.V.", journal: "NeuroImage", link: "#" },
    { id: "15", year: "2019", title: "Significant PTSD and other mental health effects present 18 months after the Fort McMurray Wildfire", authors: "Brown, M.R.G., Agyapong, V., Omeje, J., Cribben, I., et al.", journal: "Frontiers in Psychiatry", link: "#" },
    { id: "16", year: "2019", title: "After the Fort McMurray wildfire there are significant increases in mental health symptoms in Grade 7-12 students compared to controls", authors: "Brown, M.R.G., Agyapong, V., Greenshaw, A.J., Cribben, I., et al.", journal: "BMC Psychiatry", link: "#" },
    { id: "17", year: "2019", title: "Change points in heavy tailed multivariate time series: methods using precision matrices", authors: "Cribben, I.", journal: "Applied Stochastic Models in Business and Industry", link: "#" },
    { id: "18", year: "2018", title: "A longitudinal model for functional connectivity using resting-state fMRI", authors: "Hart, B., Cribben, I., Fiecas, M.", journal: "NeuroImage", link: "#" },
    { id: "19", year: "2018", title: "School-Based SBIRT Significantly Decreases Long-Term Substance Abuse in 6,227 Students Aged 11-18", authors: "Hamza, D.M., Bercov, M., Suen, V.Y.M., Allen, A., Cribben, I., et al.", journal: "Journal of Addictive Behaviors and Therapy", link: "#" },
    { id: "20", year: "2018", title: "A clustering-based feature selection method for automatically generated relational attributes", authors: "Rezaei, M., Cribben, I., Samorani, M.", journal: "Annals of Operation Research", link: "#" },
    { id: "21", year: "2018", title: "Sparse graphical models for functional connectivity networks: best methods and the autocorrelation issue", authors: "Zhu, Y., Cribben, I.", journal: "Brain Connectivity", link: "#" },
    { id: "22", year: "2017", title: "Neurological evaluation of the selection stage of metaphor comprehension in individuals with and without ASD", authors: "Chouinard, B., Volden, V., Cribben, I., Cummine, J.", journal: "Neuroscience", link: "#" },
    { id: "23", year: "2017", title: "Changes in brain activity following intensive voice treatment in children with cerebral palsy", authors: "Bakhtiari, R., Cummine, J., Reed, A., Fox, C.M., Chouinard, B., Cribben, I., Boliek, C.A.", journal: "Human Brain Mapping", link: "#" },
    { id: "24", year: "2017", title: "Long-term results from the EMPATHY program show marked reductions in suicidality, depression, and anxiety", authors: "Silverstone, P.H., Bercov, M., Suen, V.Y.M., Allen, A., Cribben, I., et al.", journal: "Frontiers in Psychiatry", link: "#" },
    { id: "25", year: "2017", title: "Risk Tolerance, Impulsivity, and Self-esteem: Differences and Similarities between Gamblers and Non-Gamblers", authors: "Suen, V., Brown, M. R., Morck, R. K., Cribben, I., Silverstone, P. H.", journal: "Advances in Social Sciences Research Journal", link: "#" },
    { id: "26", year: "2017", title: "Depression outcomes in Adults attending Family Practice were not improved by screening or on-line CBT", authors: "Silverstone, P.H., Rittenbach, K., Suen, V.Y.M., Moretzsohn, A., Cribben, I., et al.", journal: "Frontiers in Psychiatry", link: "#" },
    { id: "27", year: "2017", title: "Estimating whole brain dynamics using spectral clustering", authors: "Cribben, I., Yu, Y.", journal: "Journal of the Royal Statistical Society, Series C", link: "https://doi.org/10.1111/rssc.12191" },
    { id: "28", year: "2017", title: "A variance components model for statistical inference on functional connectivity networks", authors: "Fiecas, M., Cribben, I., Bahktiari, R., Cummine, J.", journal: "NeuroImage", link: "#" },
    { id: "29", year: "2017", title: "Invited discussion of 'Should we sample a time series more frequently?'", authors: "Yu, Y., Cribben, I.", journal: "Journal of the Royal Statistical Society, Series A", link: "#" },
    { id: "30", year: "2016", title: "Frequent Sub-Threshold Gamblers Display Unique Pattern of Brain Activation during Investment Decision-Making", authors: "Suen, V. Y. M., Brown, M. R. G., Cribben, I., Morck, R. K., Silverstone, P. H.", journal: "Journal of Psychiatry and Mental Health", link: "#" },
    { id: "31", year: "2016", title: "Imaging imageability: Behavioral effects and neural correlates of its interaction with affect and context", authors: "Westbury, C.F., Cribben, I., Cummine, J.", journal: "Frontiers in Human Neuroscience", link: "#" },
    { id: "32", year: "2016", title: "Evidence for a Print-to-Speech Neural Network using Graphical Analysis", authors: "Cummine, J., Cribben, I., Luu, C., Kim, E., Bahktiari, R., Georgiou, G., Boliek, C.A.", journal: "Neuropsychology", link: "#" },
    { id: "33", year: "2015", title: "Initial Findings from a Novel School-Based Program, EMPATHY, Which May Help Reduce Depression and Suicidality", authors: "Silverstone, P.H., Bercov, M., Suen, V.Y.M., Allen, A., Cribben, I., et al.", journal: "PLoS ONE", link: "#" },
    { id: "34", year: "2013", title: "Detecting functional connectivity change points for single-subject fMRI data", authors: "Cribben, I., Wager, T.D., Lindquist, M.A.", journal: "Frontiers in Computational Neuroscience", link: "#" },
    { id: "35", year: "2012", title: "Dynamic Connectivity Regression: Determining state-related changes in brain connectivity", authors: "Cribben, I., Haraldsdottir, R., Atlas, L., Wager, T.D., Lindquist, M.A.", journal: "NeuroImage", link: "#" },
    { id: "36", year: "2012", title: "Towards Estimating Extremal Serial Dependence via the Bootstrapped Extremogram", authors: "Davis, R.A., Mikosch, T., Cribben, I.", journal: "Journal of Econometrics", link: "#" }
  ],
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "Research", href: "#research" },
    { name: "Lab & Students", href: "#lab" },
    { name: "Publications", href: "#publications" },
    { name: "CV", href: "#cv" },
  ],
  impact: [
    { name: "Kyoto, Japan", lat: 35.0116, lng: 135.7681, year: "2022" },
    { name: "London, UK", lat: 51.5074, lng: -0.1278, year: "2021" },
    { name: "Nashville, USA", lat: 36.1627, lng: -86.7816, year: "2020" },
    { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lng: 101.6869, year: "2019" },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, year: "2019" },
    { name: "Greifswald, Germany", lat: 54.0968, lng: 13.3813, year: "2019" },
    { name: "Limassol, Cyprus", lat: 34.6786, lng: 33.0413, year: "2019" },
    { name: "Jerusalem, Israel", lat: 31.7683, lng: 35.2137, year: "2018" },
    { name: "Vancouver, Canada", lat: 49.2827, lng: -123.1207, year: "2018" },
    { name: "Barcelona, Spain", lat: 41.3851, lng: 2.1734, year: "2018" },
    { name: "Minneapolis, USA", lat: 44.9778, lng: -93.2650, year: "2018" },
    { name: "Helsinki, Finland", lat: 60.1699, lng: 24.9384, year: "2017" },
    { name: "Guanajuato, Mexico", lat: 21.0190, lng: -101.2574, year: "2017" },
    { name: "Thessaloniki, Greece", lat: 40.6401, lng: 22.9444, year: "2017" },
    { name: "Puerto Montt, Chile", lat: -41.4693, lng: -72.9424, year: "2017" },
    { name: "Seville, Spain", lat: 37.3891, lng: -5.9845, year: "2016" },
    { name: "Banff, Canada", lat: 51.1784, lng: -115.5708, year: "2016" },
    { name: "Corvallis, USA", lat: 44.5646, lng: -123.2620, year: "2016" },
    { name: "Tinos, Greece", lat: 37.5385, lng: 25.1611, year: "2016" },
    { name: "Copenhagen, Denmark", lat: 55.6761, lng: 12.5683, year: "2016" },
    { name: "Geneva, Switzerland", lat: 46.2044, lng: 6.1432, year: "2016" },
    { name: "Pula, Croatia", lat: 44.8666, lng: 13.8496, year: "2016" },
    { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832, year: "2016" },
    { name: "New York City, USA", lat: 40.7128, lng: -74.0060, year: "2016" },
    { name: "Austin, USA", lat: 30.2672, lng: -97.7431, year: "2016" },
    { name: "Rodney Bay, St Lucia", lat: 14.0754, lng: -60.9529, year: "2016" },
    { name: "Chicago, USA", lat: 41.8781, lng: -87.6298, year: "2015" },
    { name: "Victoria, Canada", lat: 48.4284, lng: -123.3656, year: "2015" },
    { name: "Seattle, USA", lat: 47.6062, lng: -122.3321, year: "2015" },
    { name: "Granada, Spain", lat: 37.1773, lng: -3.5986, year: "2015" },
    { name: "Honolulu, USA", lat: 21.3069, lng: -157.8583, year: "2015" },
    { name: "Ann Arbor, USA", lat: 42.2808, lng: -83.7430, year: "2015" },
    { name: "Pisa, Italy", lat: 43.7228, lng: 10.4017, year: "2014" },
    { name: "Boston, USA", lat: 42.3601, lng: -71.0589, year: "2014" },
    { name: "Hamburg, Germany", lat: 53.5511, lng: 9.9937, year: "2014" },
    { name: "Hong Kong", lat: 22.3193, lng: 114.1694, year: "2014" },
    { name: "Nagoya, Japan", lat: 35.1815, lng: 136.9066, year: "2014" },
    { name: "Baltimore, USA", lat: 39.2904, lng: -76.6122, year: "2014" },
    { name: "Cambridge, UK", lat: 52.2053, lng: 0.1218, year: "2014" },
    { name: "Calgary, Canada", lat: 51.0447, lng: -114.0719, year: "2013" },
    { name: "Montreal, Canada", lat: 45.5017, lng: -73.5673, year: "2013" },
    { name: "San Francisco, USA", lat: 37.7749, lng: -122.4194, year: "2013" },
    { name: "Miami, USA", lat: 25.7617, lng: -80.1918, year: "2011" },
    { name: "Quebec City, Canada", lat: 46.8139, lng: -71.2080, year: "2011" },
    { name: "Oxford, UK", lat: 51.7520, lng: -1.2577, year: "2008" },
    { name: "Enniskillen, Ireland", lat: 54.3444, lng: -7.6400, year: "2005" }
  ],
};
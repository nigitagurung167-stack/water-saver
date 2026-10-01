        // DOM Elements
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const solutionCards = document.querySelectorAll('.solution-card');

        // Calculator Inputs
        const dripsInput = document.getElementById('drips-input');
        const toiletInput = document.getElementById('toilet-input');
        const showerInput = document.getElementById('shower-input');
        const lawnInput = document.getElementById('lawn-input');

        // Calculator Outputs
        const dripsVal = document.getElementById('drips-val');
        const toiletVal = document.getElementById('toilet-val');
        const showerVal = document.getElementById('shower-val');
        const lawnVal = document.getElementById('lawn-val');
        const resGallons = document.getElementById('res-gallons');
        const resCost = document.getElementById('res-cost');
        const calcRec = document.getElementById('calc-recommendation');

        // Pledge Button
        const pledgeBtn = document.getElementById('pledge-btn');
        const globalCounter = document.getElementById('global-counter');
        const pledgeMsg = document.getElementById('pledge-msg');

        // Toggle Mobile Menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Filter Solutions Cards
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-brand-600', 'text-white', 'shadow-md');
                    b.classList.add('bg-white', 'text-slate-600');
                });
                btn.classList.add('active', 'bg-brand-600', 'text-white', 'shadow-md');
                btn.classList.remove('bg-white', 'text-slate-600');

                const filter = btn.getAttribute('data-filter');

                solutionCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Water Waste Calculator Logic
        function calculateWaterWaste() {
            const drips = parseInt(dripsInput.value);
            const toilets = parseInt(toiletInput.value);
            const showerMins = parseInt(showerInput.value);
            const lawnDays = parseInt(lawnInput.value);

            // Update Input Labels
            dripsVal.textContent = `${drips} drips/min`;
            toiletVal.textContent = toilets === 0 ? 'None' : `${toilets} Leaking Toilet${toilets > 1 ? 's' : ''}`;
            showerVal.textContent = `${showerMins} Mins`;
            lawnVal.textContent = lawnDays === 0 ? 'No Lawn' : `${lawnDays} Days/wk`;

            // Formulas:
            // 1 drip per min ~ 35 gallons/year
            const faucetGallons = drips * 35;
            // 1 leaking toilet ~ 200 gal/day = 73,000 gal/year
            const toiletGallons = toilets * 73000;
            // Shower waste: standard flow = 2.5 gpm, benchmark eco = 1.5 gpm. Excess time over 8 mins
            const extraShowerMins = Math.max(0, showerMins - 8);
            const showerGallons = extraShowerMins * 2.5 * 365 * 2; // Assuming 2 people in house
            // Lawn: avg sprinkler line = 12 gpm for 20 mins = 240 gal/session * 52 wks
            const lawnGallons = lawnDays * 240 * 52;

            const totalGallons = faucetGallons + toiletGallons + showerGallons + lawnGallons;
            // Average cost of water + sewer = $0.008 per gallon
            const totalCost = Math.round(totalGallons * 0.008);

            // Animate Number Updates
            resGallons.textContent = totalGallons.toLocaleString();
            resCost.textContent = `$${totalCost.toLocaleString()}`;

            // Dynamic Recommendation Engine
            if (toilets > 0) {
                calcRec.textContent = "High Waste Alert: Silent toilet leaks are your biggest drain! Testing your flapper seal with food coloring today could instantly save up to $180/year.";
            } else if (lawnDays >= 4) {
                calcRec.textContent = "Your lawn watering schedule is high. Switching to a smart WiFi irrigation timer can automatically pause watering during rain and cut outdoor costs by 30%.";
            } else if (showerMins > 10) {
                calcRec.textContent = "Trimming 3-4 minutes off daily showers or installing a low-flow aerated showerhead will save over 3,000 gallons annually.";
            } else if (drips > 20) {
                calcRec.textContent = "Replacing a $2 rubber faucet washer can stop persistent drips and keep over 700 gallons from going down the sink.";
            } else {
                calcRec.textContent = "Great job! Your household water footprint is quite efficient. Consider adding a sink aerator to maintain optimum conservation.";
            }
        }

        // Attach Calculator Listeners
        [dripsInput, toiletInput, showerInput, lawnInput].forEach(input => {
            input.addEventListener('input', calculateWaterWaste);
        });

        // Initialize Calculator
        calculateWaterWaste();

        // Community Pledge Counter Logic
        let currentPledge = 1248920;
        let hasPledged = false;

        pledgeBtn.addEventListener('click', () => {
            if (!hasPledged) {
                currentPledge += 2500;
                globalCounter.textContent = currentPledge.toLocaleString();
                pledgeMsg.classList.remove('hidden');
                pledgeBtn.classList.add('bg-teal-100', 'text-brand-900', 'cursor-default');
                pledgeBtn.disabled = true;
                pledgeBtn.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-600 text-lg mr-2"></i> Pledge Logged!';
                hasPledged = true;
            }
        });      


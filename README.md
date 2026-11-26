# OPS-Practice
Operation Pacific Shield Practice (A KingFish ACE experience)

Browser practice tools for OPS (Operation Pacific Shield / Kingfish ACE). Each one is a single HTML file with no install. Open it in a browser or serve it with GitHub Pages.

- `index.html`: **Pacific Shield Campaign**, a solo turn-by-turn game. Pick a role:
  - **CAOC (CFACC)**: apportion each day's C-17s and C-130s across the four MOBs, then approve or reject their airlift and fighter ATO lines (range, load config, forklift, MOG, PPRs, fuel, op areas). Score is the theater's net MP.
  - **CSpOC**: place and move satellites, answer CFACC intel requests (CCIRs), identify PLA targets so the MOBs can strike, and keep COMM, weather and missile-warning coverage up.
  - **MEDCOM (AFMEDCOM)**: fly hospital kits from JBPHH to the four MOBs, build the 16 hospital tasks, MEDEVAC casualties from struck FOS, triage and treat them, and CASEVAC downed pilots with the HH-60.
  - **MOB commander** (Kadena, Andersen, Yokota or Osan): select and build FOS, plan the airlift ATO, move fighters and fly sorties, and run the CSpOC satellites that find PLA targets.

  In the CAOC, CSpOC and MEDCOM roles the four MOBs are computer-run. The Game Master and PLA are simulated, and each game draws a random EXORD and FRAGORD condition.
- `drills.html`: **Pacific Shield Drills**, focused practice for MOG and PPR checks, FOS builds, flight plans and MEDCOM.

Some board details are estimates, including the FOS hex positions and where the space-board orbits sit over the OPS map. Your instructors' rulings win.

## Rules notes

v1.9 checked the game against the OPS User Guide, Expectations Brief, EXORD and FRAGORD and added the missing rules: sealift and aircraft apportionment every OPS block (2 turns), taxed food and water returning to the MOB, RFI answers staying with an airfield, surveying a 5th airfield, 2-turn Camo and Hardening, a ramp build 1 turn after Base Recovery is in place, a 2-turn grace period when a country revokes access, runway and parking ramp strikes that add up, airdropping a Base Recovery team with a risk token, fighter escorts for airlift through PLA hexes, 2-ship force packages, the once-per-game USSF counter-jam, and choosing the host nation chit. An aircraft bigger than a field's whole MOG can't use it.

v2.0 checked the game against the OPS video walkthrough and the execution spreadsheet: Bed Down 3 provides Tasks 1 and 2, Security 3 completes Tasks 5 and 6, a Fuel RFI of 2 or 3 brings fuel tokens with the truck, flights can make two stops (the en route download costs 1 hex), detection and strike odds follow the spreadsheet (FOS detection gets easier every turn on site, Missile Defense +5, Hardening +2, runway damage from the d100 table), the MOB runway can be struck and closed or limited for a turn, call signs are MOOSE, ARROW, BOSCO and REACH, TRANSCOM forecasts the next block's aircraft (±3 C-17 and C-130, ±1 C-5), and JB Pearl Harbor-Hickam is a Team 4 choice, with a full turn of transit to the AOR entry point.

Still simplified: no alternate airfields, fighters return to their own FOS, no country risk cards or MRA risk tokens, CASEVAC checks only the pilot's hex, satellites can't change orbit, and the computer-run MOBs in the theater roles don't use escorts or 2-ships.

## Usage counts and feedback

`site.js` adds two optional extras to both pages. Each one stays off until you fill in its setting at the top of `site.js`.

- **Usage counts** ([GoatCounter](https://www.goatcounter.com), free for non-commercial use, no cookies, no personal data): counts visits, which seat and campaign length people start, which tabs they open, and how many visits pass 1, 5, 15, 30 and 60 minutes on the page. Sign up, pick a site code, and set `GOATCOUNTER_CODE`.
- **Feedback button** ([Formspree](https://formspree.io), free tier): a Feedback button sends the message to your email without putting your address in the code. Create a form, and set `FORMSPREE_ID` to the ID in its endpoint URL.

The small version label at the bottom left (set by `VERSION` in `site.js`) changes with every update, so you can tell when GitHub Pages has refreshed.

Privacy: visitors see a note in the feedback form that the site counts visits and tool use without cookies or personal details, and that feedback goes to the site owner.

> **Practice aid only.** This is an unofficial study tool, not the official OPS game. It simplifies the rules, and some numbers are estimates read from board photos. Your class rules, the OPS User Guide and your instructors' rulings take priority.

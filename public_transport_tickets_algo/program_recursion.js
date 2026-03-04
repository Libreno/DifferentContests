function solution(A) {
    const tickets = [
        {dur: 1, cost: 2},
        {dur: 7, cost: 7},
        {dur: 30, cost: 25},
    ];
    const buyTicket = function (timeTableMaxIndex, ticket) {
        for(let i = timeTableMaxIndex - 1; i >= 0; i--) {
            // console.log(i);
            if (A[timeTableMaxIndex] - A[i] + 1 > ticket.dur) {
                // билет не последний, в расписании остаются дни
                return i;
            };
        }
        // билет последний, расписание теперь пустое
        return -1;
    };
    const m = new Map();
    const getMinCost = function (timeTableMaxIndex) {//, path, pathSum) {
        // console.log(`timeTableMaxIndex ${timeTableMaxIndex}, path ${path}, pathSum ${pathSum}`);
        if (m.has(timeTableMaxIndex)) {
            // console.log(timeTableMaxIndex + ' ! ' + m.get(timeTableMaxIndex));
            const o = m.get(timeTableMaxIndex);
            return o.minCost;
        };
        if (timeTableMaxIndex === 0) {
            // console.log([tickets[0].cost, ...path]);
            return tickets[0].cost;
        };
        let minCost = Number.MAX_VALUE;
        tickets.forEach((ticket) => {
            let newInd = buyTicket(timeTableMaxIndex, ticket);
            // console.log(`ticket dur ${ticket.dur}, newInd ${newInd}`);
            let curCost = (newInd < 0 ? 0 : getMinCost(newInd/*, [ticket.cost, ...path], pathSum + ticket.cost*/)) + ticket.cost;
            if (curCost < minCost) {
                minCost = curCost;
            }
        });
        // console.log(path);
        m.set(timeTableMaxIndex, {minCost: minCost/*, path*/});
        // console.log(minCost);
        // console.log(path);
        return minCost;
    };
    const r = getMinCost(A.length - 1, [], 0);
    // console.log(m);
    return r;
};
//FreeingStorageSpace
// console.log(solution([1,2,4,5,7,29,30]));
console.log(solution([2,3,6,8,
    9,10,12,13,14,
    17,
    21,
    30 ]));

// console.log(solution([20]));
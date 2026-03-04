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

    const getMinCost = function () {//, path, pathSum) {
        const m = new Map();
        const visited = new Set();
        const stack = [{indx: A.length - 1, ticketCost: 0, parent: undefined}];
        let minCost = Number.MAX_VALUE;

        while (stack.length > 0) {
            console.log(stack, visited);
            const vertex = stack[stack.length - 1];
            const vertexProp = m.get(vertex.indx);
            if (vertexProp) {
                if (vertexProp.solutionMin) {
                    const parentProp = m.get(vertex.parent);
                    parentProp[ticketCost] = vertexProp.solutionMin; 
                }
            }
            visited.add(vertex.indx);
            tickets.forEach((ticket) => {
                let newIndx = buyTicket(vertex.indx, ticket);
                const newCost = vertex.sumCost + ticket.cost;
                if (newIndx === -1) {
                    if (minCost > newCost) {
                        minCost = newCost;
                    };
                    return;
                };
                if (newCost < minCost && !visited.has(newIndx)) {
                    stack.push({indx: newIndx, sumCost: newCost});
                };
            });
        }
        return minCost;
    };
    const r = getMinCost();
    // console.log(m);
    return r;
};
//FreeingStorageSpace
console.log(solution([1,2,4,5,7,29,30]));
// console.log(solution([2,3,6,8,
//     9,10,12,13,14,
//     17,
//     21,
//     30 ]));

// console.log(solution([20]));
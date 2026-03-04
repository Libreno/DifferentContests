function solution(A) {
    const cost = [];
    const tickets = [];
    const find = (i, duration) => {
        let j = i + 1;
        while (j < A.length && A[j] < A[i] + duration) {
            j++;
        };
        return j;
    };
    for (let i = A.length - 1; i >=0; i--) {
        const cost1 = 2 + (i === A.length - 1? 0 : cost[i+1]);
        const t7 = find(i, 7);
        const cost7 = 7 + (t7 === A.length? 0: cost[t7]);
        const t30 = find(i, 30);
        const cost30 = 25 + (t30 === A.length? 0: cost[t30]);

        const costMin = Math.min(cost1, cost7, cost30);
        if (costMin === cost1) {
            tickets[i] = 2;
            cost[i] = cost1;
            continue;
        };
        if (costMin === cost7) {
            tickets[i] = 7;
            cost[i] = cost7;
            continue;
        }
        tickets[i] = 25;
        cost[i] = cost30;
    };
    return cost[0];
};
// console.log(solution([1,2,4,5,7,29,30]));
// console.log(solution([2,3,6,8,
//     9,10,12,13,14,
//     17,
//     21,
//     30 ]));
console.log(solution([20]));
function solution(A) {
    const possibleTickets = [];
    const getTripsCount = (i, duration) => {
        const dayMax = A[i] + duration - 1;
        let j = i;
        let trips = 0;
        while(A[j] <= dayMax) {
            trips++;
            j++;
        }
        return trips;
    };
    const ticket7trips = [];
    A.forEach((tripDay, i) => {
        const trips7days = getTripsCount(i, 7);
        if (trips7days > 3) {
            possibleTickets.push({day: tripDay, dayIndex: i, ticket7trips: trips7days});
            ticket7trips.push({possibleTicketsIndex: possibleTickets.length - 1, trips7days: trips7days});
            return;
        };
        possibleTickets.push({day: tripDay, dayIndex: i, ticket2trips: 1});
    });
    // console.log(possibleTickets.slice());
    // console.log(ticket7trips);
    ticket7trips.sort((a, b) => b.trips7days - a.trips7days);
    ticket7trips.forEach(t7t => {
        const ticket7 = possibleTickets[t7t.possibleTicketsIndex];
        if (!ticket7.ticket7trips || ticket7.ticket7trips < 4) {
            return;
        }
        let duration = 1;
        let i = t7t.possibleTicketsIndex - 1;
        let c7t = possibleTickets[i];
        while (c7t && c7t.day >= ticket7.day - 6) {
            const tripsCount = getTripsCount(c7t.dayIndex, duration);
            if (tripsCount > 3) {
                c7t.ticket7trips = tripsCount;
                c7t.ticket2trips = undefined;
            }
            else {
                c7t.ticket7trips = undefined;
                c7t.ticket2trips = 1;
            };
            c7t = possibleTickets[--i];
        };
        i = t7t.possibleTicketsIndex + 1;
        c7t = possibleTickets[i];
        while (c7t && c7t.day < ticket7.day + 7) {
            c7t.ticket7trips = undefined;
            c7t.ticket2trips = undefined;
            c7t = possibleTickets[++i];
        }
    });
    console.log(possibleTickets);
    return possibleTickets.reduce((acc, t) => {
        if (t.ticket2trips) {
            acc += 2;
        };
        if (t.ticket7trips) {
            acc += 7;
        }
        return acc;
    }, 0);
    // console.log(m);
    // return r;
};
console.log(solution([1,2,4,5,7,29,30]));
console.log(solution([2,3,6,8,
    9,10,12,13,14,
    17,
    21,
    30 ]));
// console.log(solution([20]));
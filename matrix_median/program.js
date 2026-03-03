module.exports = {
    //param A : array of array of integers
    //return an integer
    findMedian : function(A){
        const flatArray = {
            length: Number,
            init: function(A){
                this.length = A[0].length * A.length;
            },
            get: function(n) {
                if (n >= this.length) {
                    return -Number.MAX_SAFE_INTEGER;
                }
                const sectionLen = A[0].length;
                const i = Math.trunc(n / sectionLen);
                const j = n % sectionLen;
                return A[i][j]
            },
            set: function(n, val) {
                const sectionLen = A[0].length;
                const i = Math.trunc(n / sectionLen);
                const j = n % sectionLen;
                A[i][j] = val;
            },
        };
        flatArray.init(A);
        const heapSorter = {
            replaceCount: 0,
            heapSize: 0,
            sortArray : function(){
                this.heapSize = flatArray.length;
                for (let i = Math.trunc(flatArray.length / 2); i >= 0; i--) {
                    this.heapify(i);
                };
                while (this.heapSize > 1) {
                    this.replace(0, this.heapSize - 1);
                    this.heapSize--;
                    this.heapify(0);
                };
                return flatArray;
            },
            heapify(i){
                const l = 2*i + 1;
                const r = 2*i + 2;

                let largest = this.getLargest(i, l, r);
                if (largest !== i) {
                    this.replace(i, largest);
                    this.heapify(largest);
                }
            },
            getLargest(i, l, r){
                let largest = i;
                if (l < this.heapSize && flatArray.get(l) > flatArray.get(largest)) {
                    largest = l;
                };
                if (r < this.heapSize && flatArray.get(r) > flatArray.get(largest)) {
                    largest = r;
                };

                return largest;
            },
            replace(i, j) {
                // this.replaceCount++;
                // console.log(obj, ' => replace ', i, ', ', j, '');
                const t = flatArray.get(i);
                flatArray.set(i, flatArray.get(j));
                flatArray.set(j, t);
            }
        };
        heapSorter.sortArray();
        //console.log(A);
        return flatArray.get(Math.trunc(flatArray.length / 2));
    }
};
console.log(module.exports.findMedian(
    [[1, 3, 5],
    [2, 6, 9],
    [3, 6, 9]]));
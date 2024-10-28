class Solution {
public:
    int longestSquareStreak(vector<int>& nums) {
        vector<int> v(100001, 0);
        for (int num : nums)  v[num]++;

        int maxi = -1;
        for (long long int x : nums) {
            int cnt = 1;

            while (x * x < 100001) {
                x *= x;
                if (v[x] > 0) cnt++;
                else break;
            }
            maxi = max(cnt, maxi);
        }
        return maxi > 1 ? maxi : -1;
    }
};


public class UCLN {
	public int findUCLN(int a,int b) {
		int temp = 0;
		if (a == b || a != 0 && b == 0) {
            return Math.abs(a);
        }
        if (b != 0 && a == 0) {
            return Math.abs(b);
        }
        while (b != 0) {
            temp = a % b;
            a = b;
            b = temp;
        }
		return a;
	}
}

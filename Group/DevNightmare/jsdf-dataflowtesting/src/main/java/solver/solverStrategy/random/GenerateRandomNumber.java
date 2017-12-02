package solver.solverStrategy.random;

/**
 * Sinh random các giá trị số nguyên, số thực
 */

import java.text.DecimalFormat;
import java.util.Random;

class GenerateRandomNumber {

	protected static int SinhRandomSoNguyen(int canDuoi, int canTren) {
		int output;
		if (canDuoi == canTren)
			output = canDuoi;
		else {
			Random randomGenerator = new Random();
			if (canTren < 0)
				output = (randomGenerator.nextInt(1 + canDuoi * (-1) + canTren)) + canDuoi;
			else
				// if (canDuoi >= 0)
				output = randomGenerator.nextInt(1 + canTren - canDuoi) + canDuoi;
		}
		return output;
	}

	protected static double SinhRandomSoThuc(int canDuoi, int canTren) {
		if (canDuoi == canTren) {
			return canDuoi;
		}
		int phanNguyen = SinhRandomSoNguyen(canDuoi, canTren);
		Random rd = new Random();
		double phanThuc = rd.nextInt(99) / 100.0;
		DecimalFormat df = new DecimalFormat("#.##");
		phanThuc = Double.parseDouble(df.format(phanThuc));
		return Double.parseDouble(df.format(phanNguyen + phanThuc));
	}

	public static void main(String[] args) {
		System.out.println(GenerateRandomNumber.SinhRandomSoNguyen(-2, -1));
	}
}

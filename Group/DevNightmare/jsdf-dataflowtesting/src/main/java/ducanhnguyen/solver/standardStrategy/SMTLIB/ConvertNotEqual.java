package ducanhnguyen.solver.standardStrategy.SMTLIB;

import java.util.ArrayList;

/**
 * Dùng phân tích một biểu thức logic (có chứa phép so sánh khác) v�? dạng biểu
 * diễn tương đương. Lớp này được sử dụng để chuẩn hóa biểu thức logic trước khi
 * biến đổi v�? chuẩn SMT-Lib.
 * 
 * @author anhanh
 * 
 */
class ConvertNotEqual {
	private String inequation;
	private static final char AND_SYMBOL_REPLACEMENT = '&';
	private static final char OR_SYMBOL_REPLACEMENT = '|';
	private static final String INEQUATION_SYMBOL = "!=";
	private static final String INEQUATION_SYMBOL_REPLACEMENT = "@";

	/**
	 * 
	 * @param inequation
	 *            Biểu thức logic cần viết lại
	 */
	protected ConvertNotEqual(String inequation) {
		this.inequation = inequation;
		run();
	}

	protected void run() {
		standalizeInput();
		for (String inequationItem : getInequationList(inequation)) {
			String replacement = convert(inequationItem);
			if (inequation.contains("(" + inequationItem + ")"))
				inequation = inequation.replace("(" + inequationItem + ")", replacement);
			else
				inequation = inequation.replace(inequationItem, replacement);
		}
		standalizeOutput();
	}

	/**
	 * 
	 * @return biểu thức logic tương đương
	 */
	protected String getOutput() {
		return inequation;
	}

	public static void main(String[] args) {
		ConvertNotEqual c = new ConvertNotEqual("!((-M)!=(((((((((((((-N)-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M))-(-M)))");
		c.run();
		System.out.println(c.getOutput());
	}

	/**
	 * Chuẩn hóa biểu thức logic
	 */
	private void standalizeInput() {
		inequation = inequation.replace("&&", AND_SYMBOL_REPLACEMENT + "");
		inequation = inequation.replace("||", OR_SYMBOL_REPLACEMENT + "");
	}

	/**
	 * Chuẩn hóa biểu thức logic
	 */
	private void standalizeOutput() {
		inequation = inequation.replace(AND_SYMBOL_REPLACEMENT + "", "&&");
		inequation = inequation.replace(OR_SYMBOL_REPLACEMENT + "", "||");
	}

	/**
	 * 
	 * @param inequation
	 *            Biểu thức logic so sánh khác. </br/>
	 *            VD1:1!=2 </br/>
	 *            VD2:a!=b</br/>
	 *            VD3:a+b!=c*3/f
	 * @return Biểu diễn phép toán so sánh khác theo cách tương đương với 2 phép
	 *         so sánh lớn hơn và nh�? hơn.
	 */
	private String convert(String inequation) {
		final String INEQUATION_SYMBOL = "!=";
		String veTrai = inequation.split(INEQUATION_SYMBOL)[0];
		String vePhai = inequation.split(INEQUATION_SYMBOL)[1];
		return "(" + veTrai + ">" + vePhai + OR_SYMBOL_REPLACEMENT + veTrai + "<" + vePhai + ")";
	}

	/**
	 * 
	 * @param expression
	 *            Một biểu thức logic
	 * @return Tập các biểu thức logic chứa phép so sánh khác
	 */
	private ArrayList<String> getInequationList(String expression) {
		ArrayList<String> inequationList = new ArrayList<String>();
		while (expression.contains(INEQUATION_SYMBOL)) {
			int posInequationSymbol = expression.indexOf(INEQUATION_SYMBOL);
			String veTrai = MoveBackawards(expression, posInequationSymbol);
			String vePhai = MoveForwards(expression, posInequationSymbol);
			inequationList.add(veTrai + "!=" + vePhai);
			expression = expression.replaceFirst(INEQUATION_SYMBOL, INEQUATION_SYMBOL_REPLACEMENT);
		}

		return inequationList;
	}

	/**
	 * 
	 * @param expression
	 *            Một biểu thức logic
	 * @param posInequationSymbol
	 *            Vị trí phép toán so sánh khác
	 * @return veTrai Vế trái biếu thức có phép so sánh khác tại vị trí
	 *         posInequationSymbol
	 */
	private String MoveBackawards(String expression, int posInequationSymbol) {
		String veTrai = new String();
		// do some thing here
		int numOfCloseBracket = 0;
		int numOfOpenBracket = 0;
		char T;
		do {
			posInequationSymbol--;
			T = expression.charAt(posInequationSymbol);
			switch (T) {
			case ')':
				numOfCloseBracket++;
				veTrai = T + veTrai;
				break;
			case '(':
				numOfOpenBracket++;
				if (numOfOpenBracket <= numOfCloseBracket)
					veTrai = T + veTrai;
				break;
			case OR_SYMBOL_REPLACEMENT:
			case AND_SYMBOL_REPLACEMENT:
				break;
			default:
				veTrai = T + veTrai;
			}

		} while (!(posInequationSymbol == 0 || numOfCloseBracket < numOfOpenBracket || T == AND_SYMBOL_REPLACEMENT
				|| T == OR_SYMBOL_REPLACEMENT));
		return veTrai;
	}

	/**
	 * 
	 * @param expression
	 *            Một biểu thức logic
	 * @param posInequationSymbol
	 *            Vị trí phép toán so sánh khác
	 * @return veTrai Vế phải biếu thức có phép so sánh khác tại vị trí
	 *         posInequationSymbol
	 */
	private String MoveForwards(String expression, int posInequationSymbol) {
		String vePhai = new String();
		// do some thing here
		int numOfCloseBracket = 0;
		int numOfOpenBracket = 0;
		char T;
		posInequationSymbol += 1;
		do {
			posInequationSymbol++;
			T = expression.charAt(posInequationSymbol);
			switch (T) {
			case ')':
				numOfCloseBracket++;
				if (numOfOpenBracket >= numOfCloseBracket)
					vePhai = vePhai + T;
				break;
			case '(':
				numOfOpenBracket++;

				vePhai = vePhai + T;
				break;
			case OR_SYMBOL_REPLACEMENT:
			case AND_SYMBOL_REPLACEMENT:
				break;
			default:
				vePhai = vePhai + T;
				break;
			}

		} while (!(posInequationSymbol == expression.length() - 1 || numOfCloseBracket > numOfOpenBracket
				|| T == AND_SYMBOL_REPLACEMENT || T == OR_SYMBOL_REPLACEMENT));
		return vePhai;
	}

}

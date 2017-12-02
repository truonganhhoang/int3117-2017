package ducanhnguyen.solver.standardStrategy.SMTLIB;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Phân tích một biểu thức logic v�? dạng chuẩn Smt-Lib. Biểu thức logic có thể
 * có phép so sánh khác nhau, biến mảng một chi�?u và hai chi�?u. Biểu thức đầu ra
 * không có dấu cách thừa. Cụ thể: trước sau dấu mở ngoặc/đóng ngoặc không có
 * dấu cách; không có hai dấu cách li�?n k�?; biểu thức đầu ra đặt trong cặp ngoặc
 * 
 * @author anhanh
 * 
 */
class ConvertToSmtLibv2 {
	private String expression;
	private Map<String, String> arrayItemMap;

	protected ConvertToSmtLibv2(String expression) {
		this.expression = expression;
		arrayItemMap = new HashMap<>();
	}

	protected void run() {
		expression = new ConvertNotEqual(expression).getOutput();
		expression = replaceArrayItem(expression, arrayItemMap);
		expression = new ConvertToSmtLib(expression).getSmt_Lib_Expression();
		for (String arrayItem : arrayItemMap.keySet()) {
			String arrayItemSmtLib = new String("(" + arrayItem.split("\\[")[0] + " ");
			for (String index : getArrayIndexList(arrayItem)) {
				try {
					arrayItemSmtLib += Integer.parseInt(index) + " ";
				} catch (Exception e) {
					arrayItemSmtLib += new ConvertToSmtLib(index).getSmt_Lib_Expression() + " ";
				}
			}
			arrayItemSmtLib += ")";
			String replacement = arrayItemMap.get(arrayItem).toString();
			expression = expression.replace(replacement, arrayItemSmtLib);
			standlizeOutput();
		}
	}

	protected String getOutput() {
		return expression;
	}

	public static void main(String[] args) {
		ConvertToSmtLibv2 c = new ConvertToSmtLibv2("(C==D/((B-2)-1))");
		c.run();
		System.out.println(c.getOutput());
	}

	private void standlizeOutput() {
		expression = expression.replaceAll("\\s*\\(\\s*", "(").replaceAll("\\s*\\)\\s*", ")").replaceAll("\\s+", " ");
	}

	/**
	 * 
	 * @param arrayItem
	 *            Biến mảng một chi�?u hoặc hai chi�?u
	 * @return danh sách chỉ số mảng
	 */
	private String[] getArrayIndexList(String arrayItem) {
		// Ex: arrayItem=a[3][3+x]
		return arrayItem./* step 1 */substring(arrayItem.indexOf("[") + 1)
				./* step 2 */replace("[", " ").replace("]", " ")./* step 3 */replaceAll("\\s+", " ")
				./* step 4 */split(" ");
	}

	/**
	 * 
	 * @return Danh sách biến mảng có trong biểu thức logic expression
	 */
	private ArrayList<String> getArrayItemList(String expression) {
		ArrayList<String> arrayItemList = new ArrayList<>();
		// do something here
		Matcher m = Pattern.compile("\\w+(\\[([^\\]])+\\])+").matcher(expression);
		while (m.find()) {
			if (!arrayItemList.contains(m.group(0)))
				arrayItemList.add(m.group(0));
		}
		return arrayItemList;
	}

	/**
	 * 
	 * @param expression
	 *            Biếu thức logic
	 * @param arrayItemMap
	 *            Bảng ánh xa biến mảng với tên thay thế
	 * @return
	 */
	private String replaceArrayItem(String expression, Map<String, String> arrayItemMap) {
		final String PREFIX = "tvw";
		int startPREFIX = 65;
		for (String arrayItem : getArrayItemList(expression)) {
			String replacement = PREFIX + (char) (startPREFIX++);
			arrayItemMap.put(arrayItem, replacement);
			expression = expression.replace(arrayItem, replacement);
		}
		return expression;
	}
}

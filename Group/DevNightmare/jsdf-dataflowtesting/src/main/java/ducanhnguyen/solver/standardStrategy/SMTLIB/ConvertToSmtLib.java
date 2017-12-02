package ducanhnguyen.solver.standardStrategy.SMTLIB;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Biến đổi biểu thức hậu tố v�? biểu thức chuẩn SMT-Lib. Biểu thức đầu vào không
 * có phép so sánh khác nhau, không có biến mảng, không có hàm toán h�?c.
 * 
 * @author anhanh
 * 
 */
class ConvertToSmtLib {

	private Map<String, String> map = new HashMap<String, String>();
	private NodeTree root;
	private String output = "";// smt-libv2 format

	protected ConvertToSmtLib(String TrungTo) {
		// system.out.println("input=" + TrungTo);
		if (isAvailable(TrungTo)) {
			TrungTo = tienXuLyTrungTo(TrungTo, map);

			String HauTo = layHauTo(TrungTo);

			HauTo = HauTo.replaceAll("\\s+", " ");
			root = taoCayHauTo(HauTo);
			duyetCayHauTo(root);

			output = output.replace(PHEP_AND_RUT_GON, "and");
			output = output.replace(OR_RUT_GON, "or");
			output = output.replace(LON_HON_HOAC_BANG_RUT_GON, ">=");
			output = output.replace(NHO_HON_HOAC_BANG_RUT_GON, "<=");
			//output = output.replace("/", PHEP_CHIA_SMT_FORMAT); ignore in this version. but may be active in later version
			output = output.replace("%", PHEP_DU_SMT_FORMAT);
			output = output.replace(SO_SANH_KHAC_RUT_GON, "!");
			output = output.replace(PHEP_PHU_DINH, PHEP_PHU_DINH_SMT_FORMAT);

			output = thayTheKiTuTuongTrung(output, map);

			// Do SMT-Solver khong nhan dien bien mang nen chuan hoa ve bien
			// thuong
			output = output.replace("[", "_");
			output = output.replace("]", "_");
			// System.out.println("output=" + output + "\n");
		} else {
			output = null;
			// system.out.println("output= null");
		}
	}

	private boolean isAvailable(String TrungTo) {
		// Kiem tra co so sanh khac nhau khong
		String tmp = new String(TrungTo);
		if (tmp.contains("!=")) {
			return false;
		}
		//
		tmp = new String(TrungTo);
		tmp = tmp.replaceAll("\\b\\w+\\b\\(", "#");
		if (tmp.contains("#")) {
			return false;
		}
		//
		tmp = new String(TrungTo);
		tmp = tmp.replaceAll("\\[(\\d+)\\]", "#");
		if (tmp.contains("[")) {
			return false;
		}
		return true;
	}

	/**
	 * Method duyet cay bieu thuc va luu ket qua (smt-libv2 format) vao mot bien
	 * toan cuc.
	 * 
	 * @param root
	 *            root cua cay bieu thuc.
	 */
	private void duyetCayHauTo(NodeTree root) {
		if (root == null) {
			return;
		}
		if ((root.data.equals("+") || root.data.equals("-") || root.data.equals("*") || root.data.equals("/")
				|| root.data.equals("%") || root.data.equals(LON_HON_HOAC_BANG_RUT_GON)
				|| root.data.equals(NHO_HON_HOAC_BANG_RUT_GON) || root.data.equals(SO_SANH_BANG_RUT_GON)
				|| root.data.equals(PHEP_AND_RUT_GON) || root.data.equals(OR_RUT_GON)
				|| root.data.equals(SO_SANH_LON_HON) || root.data.equals(SO_SANH_KHAC_RUT_GON)
				|| root.data.equals(SO_SANH_NHO_HON) || root.data.equals(PHEP_PHU_DINH))) {
			output += "(" + root.data + " ";
			duyetCayHauTo(root.left);
			duyetCayHauTo(root.right);
		} else {
			// Neu la leaf
			if (root.getChild() == 0) {
				output += root.data + " ";
			}
		}
		// Neu root la nut phai cua cay.
		if (root.isRight) {
			output += ") ";
		}
	}

	/**
	 * Method phan tich bieu thuc hau to de tao cay bieu thuc hoan chinh.
	 * 
	 * @param hauTo
	 *            bieu thuc hau to
	 */
	private NodeTree taoCayHauTo(String hauTo) {
		// system.out.println("createTreeExpression()");
		Stack<NodeTree> stack = new Stack<>();
		NodeTree root = new NodeTree();
		for (String item : hauTo.split(" ")) {
			if (item.equals("+") || item.equals("-") || item.equals("*") || item.equals("/") || item.equals("%")
					|| item.equals(PHEP_AND_RUT_GON) || item.equals(OR_RUT_GON) || item.equals(SO_SANH_BANG_RUT_GON)
					|| item.equals(LON_HON_HOAC_BANG_RUT_GON) || item.equals(NHO_HON_HOAC_BANG_RUT_GON)
					|| item.equals(SO_SANH_LON_HON) || item.equals(SO_SANH_KHAC_RUT_GON)
					|| item.equals(SO_SANH_NHO_HON)) {
				NodeTree right = stack.pop();
				right.isRight = true;
				NodeTree left = stack.pop();
				left.isRight = false;
				NodeTree parent = new NodeTree(right, left, item);
				stack.push(parent);
				// dinh cua cay phai phai la phep toan cuoi cung.
				root = parent;
			} else if (item.equals(PHEP_PHU_DINH)) {
				NodeTree onlyChild = stack.pop();
				onlyChild.isRight = true;
				NodeTree parent = new NodeTree(onlyChild, null, item);
				stack.push(parent);
				root = parent;
			} else {
				NodeTree n = new NodeTree(null, null, item);
				stack.push(n);
			}
		}
		return root;
	}

	/**
	 * Method chuyen cac gia tri tam thoi ve gia tri that tuong ung.
	 * 
	 * @param str
	 *            xau can chuyen doi
	 * @param map
	 *            key: gia tri tam thoi; value: gia tri that
	 * @return
	 */
	private String thayTheKiTuTuongTrung(String str, Map<String, String> map) {
		String output = str;
		boolean orginal = true;
		do {
			orginal = true;
			for (String key : map.keySet()) {
				if (output.contains(key)) {
					String value = map.get(key);
					output = output.replaceAll("\\b"+key, value);
					orginal = false;
				}
			}
		} while (!orginal);
		return output;
	}

	/**
	 * Method tra ve do uu tien toan tu.
	 * 
	 * @param operator
	 * @return
	 */
	private int getPriority(char operator) {
		/*
		 * -1: khong can quan tam do uu tien 0: do uu tien thap nhat 3: do uu
		 * tien cao nhat
		 */
		if (operator == '(' || operator == ')') {
			return -2;
		}
		if (operator == '&' || operator == '|') {
			return -1;
		}

		if (operator == '=' || operator == '$' || operator == '@' || operator == '>' || operator == '<'
				|| operator == '#') {
			return 0;
		}

		if (operator == '+' || operator == '-') {
			return 1;
		}
		if (operator == '*' || operator == '/' || operator == '%') {
			return 2;
		}
		if (operator == '!') {
			return 0;
		}

		return -2;
	}

	/**
	 * Method thay the so am thanh mot ten bien tam thoi. Theo chuan smt-lib thi
	 * -3 hay (-3) khong hop le, (- 3) la hop le
	 * 
	 * @param str
	 *            xau can chuyen doi
	 * @param map
	 *            luu tru quy tac chuyen doi.key:ten bien tam, value: gia tri
	 *            that
	 * @return
	 */
	private String thayTheSoAm(String str, Map<String, String> map) {
		Pattern p = Pattern.compile("([^\\w\\)\\]])-([\\d\\.]+)");
		Matcher m = p.matcher(str);
		StringBuffer sb = new StringBuffer();

		while (m.find()) {
			String key = map.size() + "map";
			map.put(key, "(- " + m.group(2) + ")");
			m.appendReplacement(sb, m.group(1) + key);

		}
		m.appendTail(sb);
		return sb.toString();
	}

	/**
	 * Method thay the biáº¿n am thanh cÃ¡ch biá»ƒu diá»…n tÆ°Æ¡ng Ä‘Æ°Æ¡ng.
	 * Theo chuan smt-lib thi -n hay (-n) khong hop le, (-1)*n la hop le, (-
	 * 1)*n la ko hop le
	 * 
	 * @param str
	 *            xau can chuyen doi
	 * @return
	 */
	private String thayTheBienAm(String str) {
		return str = str.replaceAll("\\(-(\\w+)\\)", "(-1)*$1");
	}

	//
	private String thayTheSoBienMang(String str, Map<String, String> map) {
		Pattern p = Pattern.compile("\\w+(\\[[^\\]]\\])+");
		Matcher m = p.matcher(str);
		StringBuffer sb = new StringBuffer();

		while (m.find()) {
			String key = map.size() + "map";
			map.put(key, m.group(0));
			m.appendReplacement(sb, key);
		}
		m.appendTail(sb);
		return sb.toString();
	}

	/**
	 * 
	 * @param str
	 * @param map
	 * @return
	 */
	private String tienXuLyTrungTo(String str, Map<String, String> map) {
		// system.out.println("tienXuLi()");
		str = str.replace(">=", LON_HON_HOAC_BANG_RUT_GON);
		str = str.replace("<=", NHO_HON_HOAC_BANG_RUT_GON);
		str = str.replace("==", SO_SANH_BANG_RUT_GON);
		str = str.replace("&&", PHEP_AND_RUT_GON);
		str = str.replace("||", OR_RUT_GON);
		str = str.replace("!=", SO_SANH_KHAC_RUT_GON);
		// str = str.replaceAll("-[\\d.]+", "($0)");
		str = thayTheBienAm(str);
		str = thayTheSoAm(str, map);

		str = thayTheSoBienMang(str, map);
		// system.out.println("output=" + str);
		return str;
	}

	/**
	 * Method bien doi bieu thuc trung to ve bieu thuc hau to
	 * 
	 * @param trungTo
	 * @return
	 */
	private String layHauTo(String trungTo) {
		// system.out.println("layHauTo()");
		String output = "";
		Stack<Character> operators = new Stack<>();
		String nameVar = "";
		for (Character c : trungTo.toCharArray()) {
			switch (c) {
			case ' ':
				break;
			case '+':
			case '-':
			case '*':
			case '/':
			case '&':
			case '|':
			case '=':
			case '$':
			case '@':
			case '>':
			case '<':
			case '%':
			case '#':
			case '!':
				output += nameVar + " ";
				nameVar = "";
				/*
				     * 
				     */
				while (operators.size() > 0 && getPriority(operators.peek()) >= getPriority(c)) {
					char operator = operators.pop();
					output += operator + " ";
				}
				operators.push(c);
				break;
			case '(':
				output += nameVar + " ";
				nameVar = "";
				operators.push(c);
				break;
			case ')':
				output += nameVar + " ";
				nameVar = "";
				while (operators.peek() != '(') {
					char operator = operators.pop();
					output += operator + " ";
				}
				operators.pop();
				break;
			default:
				nameVar += c;
				break;
			}
		}
		output += nameVar + " ";
		while (operators.size() > 0) {
			char operator = operators.pop();
			output += operator + " ";
		}
		output = output.replace("  ", " ");
		// system.out.println("output=" + output);
		return output;
	}

	public static void main(String[] args) {
		// new convertToSmtLibv2("!(a==-1+-2)");
		// new convertToSmtLibv2("!(1*x>=y[2])||x>(-3)||!(1>a&&a>b[1][1])");
		// new convertToSmtLibv2("!(year%400==0||!(year%4==0&&year%100>=0))");
		// new convertToSmtLibv2("!(!(value[0][1]==(-2))&&!(0<value[1]))");
		// new convertToSmtLibv2("(((B-2)==B)||((C==D)&&((B-2)==0)))");
		// new convertToSmtLibv2("((-A)<=0||B<=0||C+-2.1<=0)");
		// new convertToSmtLibv2("a[1n]>2");
		// new convertToSmtLibv2("sin(1)>2");
		// new convertToSmtLibv2("(value[0]!=-2&&(0)<2)");
		// new convertToSmtLibv2("!(!(a>0&&a<10))");
		System.out.println(new ConvertToSmtLib("((C==D/((B-2)-1)))").getSmt_Lib_Expression());
	}

	protected String getSmt_Lib_Expression() {
		return output;
	}

	private static final String LON_HON_HOAC_BANG_RUT_GON = "$";
	private static final String NHO_HON_HOAC_BANG_RUT_GON = "@";
	private static final String SO_SANH_BANG_RUT_GON = "=";
	private static final String SO_SANH_LON_HON = ">";
	private static final String SO_SANH_NHO_HON = "<";
	private static final String PHEP_AND_RUT_GON = "&";
	private static final String SO_SANH_KHAC_RUT_GON = "#";
	private static final String OR_RUT_GON = "|";
	private static final String PHEP_CHIA_SMT_FORMAT = "div";
	private static final String PHEP_DU_SMT_FORMAT = "mod";
	private static final String PHEP_PHU_DINH_SMT_FORMAT = "not";
	private static final String PHEP_PHU_DINH = "!";

	class NodeTree {

		NodeTree right, left;
		String data;
		boolean isRight = false;

		protected NodeTree() {

		}

		protected int getChild() {
			int numChild = 0;
			if (right != null) {
				numChild++;
			}
			if (left != null) {
				numChild++;
			}
			return numChild;
		}

		protected NodeTree(NodeTree right, NodeTree left, String data) {
			this.right = right;
			this.left = left;
			this.data = data;
		}
	}
}

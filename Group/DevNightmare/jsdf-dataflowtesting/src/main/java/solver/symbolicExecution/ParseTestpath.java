package solver.symbolicExecution;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * This class is used to parse a testpath to get corresponding constraints by
 * applying symbolic execution technique
 * 
 * @author DucAnh
 *
 */
public class ParseTestpath {
	private ArrayList<String> testpath = new ArrayList<String>();
	private ArrayList<Bien> danhSachThamSo = new ArrayList<Bien>();
	private ArrayList<Bien> danhSachBien = new ArrayList<Bien>();
	private ArrayList<String> danhSachCauLenhDieuKien = new ArrayList<String>();

	public ParseTestpath(ArrayList<String> testpath, ArrayList<String> testcase) {
		this.testpath = testpath;
		this.danhSachThamSo = chuanHoaDanhSachThamSo(testcase);
		run();
	}

	public static void main(String[] args) {
		ArrayList<String> testpaths = new ArrayList<>();
		testpaths.add("(size>0)");
		testpaths.add("!(a>b)");

		ArrayList<String> testcases = new ArrayList<>();
		testcases.add("int size");
		testcases.add("int a");
		testcases.add("int b");

		ParseTestpath parser = new ParseTestpath(testpaths, testcases);

		System.out.println(parser.getOutput());
	}

	public void run() {
		testpath = themThamSoVaoTestpath(danhSachThamSo, testpath);
		for (String cauLenh : testpath) {
			int kieuCauLenh = layKieuCauLenh(cauLenh);
			if (kieuCauLenh == CAU_LENH_KHAI_BAO) {
				cauLenh = cauLenh.substring(1, cauLenh.lastIndexOf(")"));
				String cauLenhKhaiBao = cauLenh;
				ArrayList<String> tapKhaiBaoDon = layTapKhaiBaoDon(cauLenhKhaiBao);
				danhSachBien = themBienKhaiBaoVaoDanhSachBien(tapKhaiBaoDon, danhSachBien);
			} else if (kieuCauLenh == CAU_LENH_GAN) {
				cauLenh = cauLenh.substring(1, cauLenh.lastIndexOf(")"));
				cauLenh = convertToTwoSide(cauLenh);
				String[] danhSachVe = laiHaiVePhepGan(cauLenh);
				String veTrai = rutGonVeTraiCauLenhGan(danhSachVe[0], danhSachBien);
				String vePhai = rutGonVePhaiCauLenhGan(danhSachVe[1], danhSachBien);
				boolean isExist = tonTaiTrongDanhSachBien(veTrai, danhSachBien);
				if (isExist) {
					capNhatGiaTriBienTrongDanhSachBien(veTrai, vePhai, danhSachBien);
				} else {
					themBienMangVaoDanhSachBien(veTrai, vePhai, danhSachBien, danhSachThamSo);
				}
			} else if (kieuCauLenh == CAU_LENH_DIEU_KIEN) {
				String cauLenhDieuKien = cauLenh;
				cauLenhDieuKien = rutGonBieuThuc(cauLenhDieuKien, danhSachBien);
				danhSachCauLenhDieuKien.add(cauLenhDieuKien);
			} else {
				// nothing to do
			}
		}

	}

	/**
	 * Biáº¿n Ä‘á»•i phÃ©p ++, --, *=, etc vá»� dáº¡ng biá»ƒu diá»…n tÆ°Æ¡ng
	 * Ä‘Æ°Æ¡ng. VD:"i++" trá»Ÿ thÃ nh "i=i+1"
	 * 
	 * @param bieuThuc
	 * @return
	 */
	private String convertToTwoSide(String bieuThuc) {
		if (bieuThuc.contains("++")) {
			String nameVar = bieuThuc.replace("++", "");
			bieuThuc = nameVar + "=" + nameVar + "+ 1";
		} else if (bieuThuc.contains("*=") || bieuThuc.contains("+=") || bieuThuc.contains("-=")
				|| bieuThuc.contains("/=")) {
			String[] s = bieuThuc.split("=");
			bieuThuc = s[0].substring(0, s[0].length() - 1) + "=" + s[0].substring(0) + "(" + s[1] + ")";
		} else if (bieuThuc.contains("--")) {
			String nameVar = bieuThuc.replace("--", "");
			bieuThuc = nameVar + "=" + nameVar + "-1";
		}
		return bieuThuc;
	}

	private ArrayList<String> themThamSoVaoTestpath(ArrayList<Bien> testcase, ArrayList<String> testpath) {
		for (Bien var : testcase) {
			switch (var.getType()) {
			case Bien.DOUBLE:
				testpath.add(0, "(double " + var.getName() + ")");
				break;
			case Bien.DOUBLE_ARRAY_ONE_DIMENSION:
				testpath.add(0, "(double " + var.getName() + "[])");
				break;
			case Bien.DOUBLE_ARRAY_TWO_DIMENSION:
				testpath.add(0, "(double " + var.getName() + "[][])");
				break;
			case Bien.INT:
				testpath.add(0, "(int " + var.getName() + ")");
				break;
			case Bien.INT_ARRAY_ONE_DIMENSION:
				testpath.add(0, "(int " + var.getName() + "[])");
				break;
			case Bien.INT_ARRAY_TWO_DIMENSION:
				testpath.add(0, "(int " + var.getName() + "[][])");
				break;
			}
		}
		return testpath;
	}

	/**
	 * ThÃªm biáº¿n má»›i vÃ o danh sÃ¡ch biáº¿n
	 * 
	 * @param arrayVar
	 * @param danhSachBien
	 * @return
	 */
	private void themBienMangVaoDanhSachBien(String arrayVar, String value, ArrayList<Bien> danhSachBien,
			ArrayList<Bien> danhSachThamSo) {
		String tenBien = Utils.getNameOfArrayItem(arrayVar);
		for (Bien var : danhSachThamSo)
			if (var.getName().equals(tenBien)) {
				Bien newVar = new Bien(arrayVar, var.getType(), value);
				danhSachBien.add(newVar);
				return;
			}
	}

	/**
	 * Cáº­p nháº­t giÃ¡ trá»‹ má»›i cá»§a biáº¿n danh sÃ¡ch biáº¿n
	 * 
	 * @param nameVar
	 * @param danhSachBien
	 * @return
	 */
	private void capNhatGiaTriBienTrongDanhSachBien(String nameVar, String newValue, ArrayList<Bien> danhSachBien) {
		for (Bien var : danhSachBien)
			if (var.getName().equals(nameVar)) {
				var.setValue(newValue);
				return;
			}
	}

	/**
	 * Kiá»ƒm tra biáº¿n Ä‘Ã£ náº±m trong báº£ng biáº¿n chÆ°a
	 * 
	 * @param nameVar
	 * @param danhSachBien
	 * @return
	 */
	private boolean tonTaiTrongDanhSachBien(String nameVar, ArrayList<Bien> danhSachBien) {
		boolean isExist = false;
		for (Bien var : danhSachBien)
			if (var.getName().equals(nameVar)) {
				isExist = true;
				break;
			}
		return isExist;
	}

	/**
	 * RÃºt gá»�n váº¿ pháº£i cÃ¢u lá»‡nh gÃ¡n
	 * 
	 * @param vePhai
	 * @return
	 */
	private String rutGonVePhaiCauLenhGan(String vePhai, ArrayList<Bien> danhSachBien) {
		String output = rutGonBieuThuc(vePhai, danhSachBien);
		return output;

	}

	/**
	 * RÃºt gá»�n váº¿ trÃ¡i cÃ¢u lá»‡nh gÃ¡n. Náº¿u váº¿ trÃ¡i chá»‰ lÃ  biáº¿n
	 * thÆ°á»�ng hoáº·c biáº¿n máº£ng cÃ³ chá»‰ sá»‘ lÃ  sá»‘ nguyÃªn thÃ¬
	 * khÃ´ng cáº§n rÃºt gá»�n. NgÆ°á»£c láº¡i, náº¿u chá»‰ sá»‘ biáº¿n máº£ng
	 * lÃ  má»™t biá»ƒu thá»©c thÃ¬ cáº§n rÃºt gá»�n.<br/>
	 * Trong cÃ¡c vÃ­ dá»¥ thá»±c táº¿, trÆ°á»�ng há»£p ngÆ°á»£c láº¡i ráº¥t
	 * hiáº¿m khi xáº£y ra nÃªn cÃ³ thá»ƒ bá»� qua.
	 * 
	 * @param veTrai
	 * @return
	 */
	private String rutGonVeTraiCauLenhGan(String veTrai, ArrayList<Bien> danhSachBien) {
		String output = veTrai;
		if (Utils.containArrayItem(veTrai)) {
			String index = Utils.getIndexOfArrayItem(veTrai);
			String indexRutGon = rutGonBieuThuc(index, danhSachBien);
			output = output.replace(index, indexRutGon);
		} else {
			// nothing to do here
		}
		return output;

	}

	/**
	 * Thay tháº¿ cÃ¡c biáº¿n trong biá»ƒu thá»©c vá»›i giÃ¡ trá»‹ cá»¥ thá»ƒ.
	 * Táº¥t cáº£ nhá»¯ng biáº¿n khÃ´ng mang giÃ¡ trá»‹ cá»¥ thá»ƒ, vÃ  khÃ´ng
	 * pháº£i tham sá»‘ truyá»�n vÃ o thÃ¬ nháº­n giÃ¡ trá»‹ máº·c Ä‘á»‹nh lÃ  0
	 * 
	 * @param bieuThuc
	 * @param danhSachBien
	 * @return
	 */
	private String rutGonBieuThuc(String bieuThuc, ArrayList<Bien> danhSachBien) {
		String bieuThucRutGon = bieuThuc;
		bieuThucRutGon = thayTheBienVoiGiaTri(bieuThucRutGon, danhSachBien);
		bieuThucRutGon = rutGonChiSoMang(bieuThucRutGon);
		bieuThucRutGon = rutGonSoThuc(bieuThucRutGon);
		ArrayList<String> danhSachBienMang = layDanhSachBienMang(bieuThucRutGon);
		for (String bienMang : danhSachBienMang) {
			boolean isExist = laThamSoTruyenVao(bienMang, danhSachThamSo);
			if (!isExist)
				bieuThucRutGon = bieuThucRutGon.replace(bienMang, "0");
			else {
				bieuThucRutGon = bieuThucRutGon.replace(bienMang, bienMang.toUpperCase());
			}
		}
		if (layKieuCauLenh(bieuThucRutGon) != CAU_LENH_DIEU_KIEN)
			bieuThucRutGon = new myJeval().evaluate(bieuThucRutGon);
		return bieuThucRutGon;
	}

	/**
	 * Kiá»ƒm tra biáº¿n cÃ³ pháº£i tham sá»‘ truyá»�n vÃ o hÃ m hay khÃ´ng
	 * 
	 * @param bien
	 * @return
	 */
	private boolean laThamSoTruyenVao(String bien, ArrayList<Bien> danhSachThamSo) {
		String tenBien = bien.contains(DAU_HIEU_BIEN_MANG) ? Utils.getNameOfArrayItem(bien) : bien;
		for (Bien var : danhSachThamSo)
			if (var.getName().equals(tenBien))
				return true;
		return false;

	}

	/**
	 * Láº¥y danh sÃ¡ch biáº¿n máº£ng cÃ³ trong biá»ƒu thá»©c logic
	 * 
	 * @return
	 */
	private ArrayList<String> layDanhSachBienMang(String expression) {
		ArrayList<String> arrayItemList = new ArrayList<>();
		Matcher m = Pattern.compile("[a-z0-9]+(\\[([^\\]])+\\])+").matcher(expression);
		while (m.find()) {
			if (!arrayItemList.contains(m.group(0)))
				arrayItemList.add(m.group(0));
		}
		return arrayItemList;
	}

	/**
	 * Remove unneccessary ".0" String. Ex: 1.0 => 1<br/>
	 * 2.01+3.0=>2.01+3
	 * 
	 * @param expression
	 * @return
	 */
	private String rutGonSoThuc(String expression) {
		expression = expression + "@";// to simplify regex
		Matcher m = Pattern.compile("(\\d)\\.0([^\\d])").matcher(expression);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, m.group(1) + m.group(2));
		}
		m.appendTail(sb);
		return sb.deleteCharAt(sb.length() - 1).toString();
	}

	/**
	 * TÃ­nh toÃ¡n giÃ¡ trá»‹ chá»‰ sá»‘ máº£ng náº¿u lÃ  má»™t biá»ƒu thá»©c.
	 * Ex: a[1+2] => a[3] <br/>
	 * a[1/2] => a[0] a[1+a[3+1]] =>a[1+a[4]]
	 * 
	 * @param expression
	 * @return
	 */
	private String rutGonChiSoMang(String bieuThucLogic) {
		String output = bieuThucLogic;
		output = output + "@";// to simplify regex
		Matcher m = Pattern.compile("\\[([^\\]\\[]+)\\]").matcher(output);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "[" + new myJeval().evaluate(m.group(1)) + "]");
		}
		m.appendTail(sb);
		return sb.deleteCharAt(sb.length() - 1).toString();
	}

	/**
	 * Thay tháº¿ cÃ¡c biáº¿n trong biá»ƒu thá»©c logic vá»›i giÃ¡ trá»‹ cá»¥
	 * thá»ƒ
	 * 
	 * @param bieuThucLogic
	 * @param danhSachBien
	 * @return
	 */
	private String thayTheBienVoiGiaTri(String bieuThucLogic, ArrayList<Bien> danhSachBien) {
		String output = bieuThucLogic;
		for (Bien var : danhSachBien)
			if (laBieuThuc(var.getValue()))
				output = output.replaceAll("\\b" + Utils.toRegex(var.getName()), "(" + var.getValue() + ")");
			else
				output = output.replaceAll("\\b" + Utils.toRegex(var.getName()), var.getValue());
		return output;
	}

	private boolean laBieuThuc(String valueVar) {
		for (Character c : valueVar.toCharArray())
			if (!(c == '.' || (c >= '0' && c <= '9') || (c >= 'A' && c <= 'z')))
				return true;
		return false;
	}

	/**
	 * Láº¥y váº¿ trÃ¡i vÃ  váº¿ pháº£i cá»§a phÃ©p gÃ¡n
	 * 
	 * @param phepGan
	 * @return
	 */
	private String[] laiHaiVePhepGan(String phepGan) {
		return phepGan.split(DAU_PHEP_GAN);
	}

	/**
	 * ThÃªm cÃ¡c biáº¿n Ä‘Æ°á»£c khai bÃ¡o vÃ o báº£ng biáº¿n
	 * 
	 * @param tapKhaiBaoDon
	 * @param danhSachBien
	 * @return
	 */
	private ArrayList<Bien> themBienKhaiBaoVaoDanhSachBien(ArrayList<String> tapKhaiBaoDon,
			ArrayList<Bien> danhSachBien) {
		for (String khaiBao : tapKhaiBaoDon) {
			String type = khaiBao.split(" ")[0];
			String name = "";
			String value = "";
			if (khaiBao.contains("=")) {
				value = khaiBao.split("=")[1];
				name = khaiBao.split(" ")[1].replace("=" + value, "");
				value = rutGonBieuThuc(value, danhSachBien);
			} else {
				name = khaiBao.split(" ")[1];
				if (laThamSoTruyenVao(name, danhSachThamSo) && !name.contains(DAU_HIEU_BIEN_MANG))
					value = name.toUpperCase();
				else if (laThamSoTruyenVao(name.replace("[", "").replace("]", ""), danhSachThamSo)
						&& name.contains(DAU_HIEU_BIEN_MANG))
					continue;
				else
					value = "0";
			}
			switch (type) {
			case KHAI_BAO_SO_NGUYEN:
			case KHAI_BAO_SO_NGUYEN1:
			case KHAI_BAO_SO_NGUYEN2:
			case KHAI_BAO_SO_NGUYEN3:
				danhSachBien.add(new Bien(name, Bien.INT, value));
				break;
			case KHAI_BAO_SO_THUC:
			case KHAI_BAO_SO_THUC1:
				danhSachBien.add(new Bien(name, Bien.DOUBLE, value));
				break;
			}

		}
		return danhSachBien;
	}

	/**
	 * Láº¥y táº­p cÃ¢u lá»‡nh khai bÃ¡o Ä‘Æ¡n trong cÃ¢u lá»‡nh khai bÃ¡o kÃ©p.
	 * VÃ­ dá»¥:cauLenhKhaiBao="int a,b" thÃ¬ output gá»“m "int a" vÃ  "int b"
	 * 
	 * @param cauLenhKhaiBao
	 * @return
	 */
	private ArrayList<String> layTapKhaiBaoDon(String cauLenhKhaiBao) {
		ArrayList<String> tapKhaiBao = new ArrayList<String>();
		final String DELIMITER_DECLARATION = ",";
		boolean khaiBaoNhieuBien = cauLenhKhaiBao.contains(DELIMITER_DECLARATION);
		if (khaiBaoNhieuBien) {
			String[] tmp = cauLenhKhaiBao.split(",");
			String kieuBien = tmp[0].split(" ")[0];
			tmp[0] = tmp[0].replace(kieuBien + " ", "");
			for (String khaiBao : tmp)
				tapKhaiBao.add(kieuBien + " " + khaiBao);
		} else {
			tapKhaiBao.add(cauLenhKhaiBao);
		}
		return tapKhaiBao;
	}

	/**
	 * Láº¥y kiá»ƒu cÃ¢u lá»‡nh
	 * 
	 * @param cauLenh
	 * @return
	 */
	private int layKieuCauLenh(String cauLenh) {
		int kieuCauLenh = CAU_LENH_KHONG_XAC_DINH;
		if (cauLenh.contains(KHAI_BAO_SO_NGUYEN) || cauLenh.contains(KHAI_BAO_SO_NGUYEN1)
				|| cauLenh.contains(KHAI_BAO_SO_NGUYEN2) || cauLenh.contains(KHAI_BAO_SO_NGUYEN3)
				|| cauLenh.contains(KHAI_BAO_SO_THUC) || cauLenh.contains(KHAI_BAO_SO_THUC1))
			kieuCauLenh = CAU_LENH_KHAI_BAO;
		else if (cauLenh.contains(SO_SANH_BANG) || cauLenh.contains(SO_SANH_KHAC) || cauLenh.contains(SO_SANH_LON_HON)
				|| cauLenh.contains(SO_SANH_LON_HON_HOAC_BANG) || cauLenh.contains(SO_SANH_NHO_HON)
				|| cauLenh.contains(SO_SANH_NHO_HON_HOAC_BANG))
			kieuCauLenh = CAU_LENH_DIEU_KIEN;
		else if (cauLenh.contains(DAU_PHEP_GAN) || cauLenh.contains("++") || cauLenh.contains("--")
				|| cauLenh.contains("*=") || cauLenh.contains("/=") || cauLenh.contains("+=") || cauLenh.contains("-="))
			kieuCauLenh = CAU_LENH_GAN;
		return kieuCauLenh;
	}

	/**
	 * Chuáº©n hÃ³a danh sÃ¡ch tham sá»‘ truyá»�n vÃ o vá»� dáº¡ng danh sÃ¡ch
	 * liÃªn káº¿t
	 * 
	 * @param testcase
	 * @return
	 */
	private ArrayList<Bien> chuanHoaDanhSachThamSo(ArrayList<String> testcase) {
		ArrayList<Bien> variableList = new ArrayList<>();
		for (String khaiBao : testcase) {
			String type = khaiBao.split(" ")[0];
			if (khaiBao.contains("]")) {
				String name = khaiBao.substring(khaiBao.indexOf(" ") + 1, khaiBao.indexOf("["));
				if (khaiBao.contains("][")) // náº¿u lÃ  máº£ng hai chiá»�u
					switch (type) {
					case "int":
						variableList.add(new Bien(name, Bien.INT_ARRAY_TWO_DIMENSION));
						break;
					case "double":
						variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_TWO_DIMENSION));
						break;
					}
				else
					// náº¿u lÃ  máº£ng 1 chiá»�u
					switch (type) {
					case "int":
						variableList.add(new Bien(name, Bien.INT_ARRAY_ONE_DIMENSION));
						break;
					case "double":
						variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_ONE_DIMENSION));
						break;
					}
			} else { // náº¿u khÃ´ng pháº£i khai bÃ¡o máº£ng
				String name = khaiBao.split(" ")[1];
				switch (type) {
				case "int":
					variableList.add(new Bien(name, Bien.INT));
					break;
				case "double":
					variableList.add(new Bien(name, Bien.DOUBLE));
					break;
				}
			}
		}
		return variableList;
	}

	public ArrayList<String> getOutput() {
		ArrayList<String> output = new ArrayList<String>();
		for (String item : danhSachCauLenhDieuKien)
			output.add(item.toLowerCase());
		return output;
	}

	private static final String DAU_PHEP_GAN = "=";
	private static final int CAU_LENH_KHONG_XAC_DINH = -1;
	private static final int CAU_LENH_KHAI_BAO = 0;
	private static final int CAU_LENH_GAN = 2;
	private static final int CAU_LENH_DIEU_KIEN = 3;
	private static final String KHAI_BAO_SO_NGUYEN = "int";
	private static final String KHAI_BAO_SO_NGUYEN1 = "long";
	private static final String KHAI_BAO_SO_NGUYEN2 = "byte";
	private static final String KHAI_BAO_SO_NGUYEN3 = "short";
	private static final String KHAI_BAO_SO_THUC = "double";
	private static final String KHAI_BAO_SO_THUC1 = "float";
	private static final String SO_SANH_LON_HON_HOAC_BANG = ">=";
	private static final String SO_SANH_NHO_HON_HOAC_BANG = "<=";
	private static final String SO_SANH_LON_HON = ">";
	private static final String SO_SANH_NHO_HON = "<";
	private static final String SO_SANH_KHAC = "!=";
	private static final String SO_SANH_BANG = "==";
	private static final String DAU_HIEU_BIEN_MANG = "]";
}

import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://10.0.2.2:5000/api/auth"; // Use 10.0.2.2 for emulators

  Future<Map<String, dynamic>?> signup(String name, String email, String password, bool isParent) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/signup"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
          "email": email,
          "password": password,
          "role": isParent ? "parent" : "teacher"
        }),
      );

      if (response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        print("❌ Signup failed: ${response.body}");
        return null;
      }
    } catch (e) {
      print("❌ Error: $e");
      return null;
    }
  }
}

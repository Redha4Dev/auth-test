import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {  
 Future<bool> loginUser(String email, String password) async {
  final url = Uri.parse('http://10.0.2.2:5000/api/v1/users/login'); // replace <your-ip> with actual IP

  try {
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final token = data['token'];

      // Save token locally
      // final prefs = await SharedPreferences.getInstance();
      // await prefs.setString('token', token);
      // await prefs.setString('email', email); // Optional
      // await prefs.setBool('loggedIn', true);

      return true;
    } else {
      print("Login failed: ${response.body}");
      return false;
    }
  } catch (e) {
    print("Error during login: $e");
    return false;
  }
}

  Future<void> createUser(String name,email,password,confirmPassword,role,phone,gender) async {
    final url = Uri.parse(
        'http://10.0.2.2:5000/signup'); // or your actual local IP if on real phone

    final Map<String, dynamic> userData = {
      'name': name,
      'email': email,
      'password': password,
      'confirmPassword': confirmPassword,
      'role': role,
      'phone': phone,
      'gender': gender,
    };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(userData),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        print('User created: ${response.body}');
        // Optionally, show a success message or navigate to another page
      } else {
        print('Failed to create user: ${response.body}');
        // Optionally, show an error message
      }
    } catch (e) {
      print('Error: $e');
    }
  }
}

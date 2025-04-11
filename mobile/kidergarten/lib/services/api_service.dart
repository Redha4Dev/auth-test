import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  Future<Map<String, dynamic>?> loginUser(String email, String password) async {
    final url = Uri.parse(
        'http://10.0.2.2:5000/login'); // replace <your-ip> with actual IP

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // Decode JSON string into a Map
      final Map<String, dynamic> responseData = jsonDecode(response.body);

      // Save the token in shared preferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', responseData['token']);

      return responseData;
    } else {
      print('Login failed: ${response.body}');
      return null;
    }
  }

// Function to fetch parent info using the token
  Future<Map<String, dynamic>?> getParentInfo() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      if (token == null) {
        throw Exception('User is not logged in');
      }

      // Decode the token to get the user ID (or any other information)
      final decodedToken = JwtDecoder.decode(token);
      final userId =
          decodedToken['id']; // Assuming 'id' is stored in the token payload
      final userName = decodedToken[
          'name']; // Assuming 'name' is stored in the token payload

      final url = Uri.parse('http://10.0.2.2:5000/parent/profile');
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
              'Bearer $token', // Include the token in the Authorization header
        },
        body: jsonEncode({
          'id': userId, // Pass the userId extracted from the token
          'name': userName, // Pass the userName if required
        }),
      );

      if (response.statusCode == 200) {
        // If the server returns a 200 OK response, parse the parent data
        return jsonDecode(response.body)['parent'];
      } else {
        print('Failed to fetch parent info: ${response.body}');
        return null;
      }
    } catch (error) {
      print('Error: $error');
      return null;
    }
  }

  Future<void> createUser(String name, email, password, confirmPassword, role,
      phone, gender) async {
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

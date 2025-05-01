import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:kidergarten/global.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  Future<void> getKidInfo(String name, String id) async {
  final uri = Uri.parse('http://10.0.2.2:5000/admin/manage-kids')
      .replace(queryParameters: {'name': name, 'id': id});

  try {
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      print('👶 Kid Info: ${data['kid']}');
    } else {
      final error = jsonDecode(response.body);
      print('⚠️ Failed to fetch kid info: ${error['message']}');
    }
  } catch (e) {
    print('❌ Error fetching kid info: $e');
  }
}

  Future<Map<String, dynamic>?> getUserFromToken() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token != null && token.isNotEmpty) {
      try {
        Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
        // Assuming your JWT contains 'id' and 'name'
        return {
          'id': decodedToken['id'],
          'name': decodedToken['name'],
        };
      } catch (e) {
        print('Token decoding failed: $e');
        return null;
      }
    } else {
      print('No token found');
      return null;
    }
  }

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

  Future<Map<String, dynamic>?> getParentInfo(String id, String name) async {
    final url = Uri.parse('http://10.0.2.2:5000/parent/profile');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id': id,
          'name': name,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print('✅ Parent found: $data');

        // Store globally
        globalParentData = data;

        // Optional: store persistently
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('parentData', jsonEncode(data));
        data.forEach((key, value) {
          print('$key: $value');
        });

        return data;
      } else {
        final error = jsonDecode(response.body);
        print('⚠️ Error: ${error['message']}');
        return null;
      }
    } catch (e) {
      print('❌ Request failed: $e');
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

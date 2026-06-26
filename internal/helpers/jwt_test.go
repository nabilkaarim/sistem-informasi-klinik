package helpers

import (
	"testing"

	"github.com/golang-jwt/jwt/v5"
)

func TestGenerateTokenUsesConfiguredSecret(t *testing.T) {
	t.Setenv("SECRET_KEY", "clinic-secret")

	tokenString, err := GenerateToken(7, "admin")
	if err != nil {
		t.Fatalf("GenerateToken returned error: %v", err)
	}

	parsed, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("clinic-secret"), nil
	})
	if err != nil {
		t.Fatalf("jwt.Parse returned error: %v", err)
	}

	if !parsed.Valid {
		t.Fatal("expected token to be valid")
	}
}

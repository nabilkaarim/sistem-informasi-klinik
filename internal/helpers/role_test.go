package helpers

import "testing"

func TestResolveRoleUsesExplicitValue(t *testing.T) {
	if got := ResolveRole("admin@example.com", "dokter"); got != "dokter" {
		t.Fatalf("expected explicit role to be preserved, got %q", got)
	}
}

func TestResolveRoleMapsKnownEmails(t *testing.T) {
	cases := map[string]string{
		"admin@example.com":   "admin",
		"petugas@example.com": "petugas",
		"dokter@example.com":  "dokter",
	}

	for email, want := range cases {
		if got := ResolveRole(email, ""); got != want {
			t.Fatalf("expected %q to map to %q, got %q", email, want, got)
		}
	}
}
